/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: TG Global AI Shopping Assistant
  app.post('/api/assistant', async (req: Request, res: Response) => {
    try {
      const { messages, products } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Mensagens são obrigatórias e devem ser um array.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'Chave de API do Gemini (GEMINI_API_KEY) não está configurada no painel de Secrets.'
        });
      }

      // Initialize the official @google/genai SDK on the server
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Contextual instructions embedding the live store database so the AI knows exactly what is available
      const storeProductsContext = products && Array.isArray(products)
        ? products.map((p: any) => `- ID: ${p.id}, Nome: ${p.title}, Preço: R$ ${p.price.toFixed(2)}, Categoria: ${p.category}, Vendedor: ${p.sellerName}, Frete Grátis: ${p.freeShipping ? 'Sim' : 'Não'}, Estoque: ${p.stock} unidades. Descrição: ${p.description}`).join('\n')
        : 'Nenhum produto cadastrado no momento.';

      const systemInstruction = `Você é o "TG Assistant", o assistente inteligente de compras oficial da TG Global, uma plataforma de e-commerce inspirada no AliExpress.
Seu objetivo é ser extremamente amigável, prestativo e persuasivo, ajudando os compradores a encontrar os melhores produtos e cupons.

Instruções importantes:
1. Sempre responda em Português brasileiro.
2. Seja conciso e use formatação Markdown elegante (como negritos, listas e tabelas) para tornar as respostas fáceis de ler.
3. Use dados REAIS da nossa loja para sugerir produtos. Abaixo está o catálogo atual da loja. Se o usuário pedir recomendações, escolha um ou mais desses produtos e mostre o nome, preço e por que é uma ótima compra:
---
PRODUTOS DISPONÍVEIS NA LOJA:
${storeProductsContext}
---
4. Se o usuário perguntar sobre cupons de desconto, informe que temos cupons incríveis ativos na loja:
- 'TGGLOBAL10' para 10% de desconto em compras acima de R$ 50,00.
- 'SUPER30' para R$ 30,00 de desconto fixo em compras acima de R$ 150,00.
- 'BEMVINDO' para 15% de desconto para novos usuários em compras acima de R$ 20,00.
5. Sempre que recomendar um produto, mencione que ele pode adicioná-lo diretamente ao carrinho clicando no produto no catálogo para ver mais detalhes.
6. Se o usuário estiver indeciso ou perguntar por promoções, recomende itens com maiores descontos ou frete grátis.
7. Evite inventar produtos que não estejam listados acima. Se não tivermos o que ele procura, sugira a alternativa mais próxima do nosso catálogo ou ofereça ajuda geral.`;

      // Structure conversation history for Gemini
      // Format as `{ role: 'user' | 'model', parts: [{ text: '...' }] }`
      const formattedContents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || 'Desculpe, tive um contratempo para formular a resposta. Como posso ajudar você hoje?';
      res.json({ text: responseText });

    } catch (error: any) {
      console.error('Erro na chamada da API do Gemini:', error);
      res.status(500).json({ error: error.message || 'Erro interno do servidor ao conectar com o assistente.' });
    }
  });

  // Serve static files and compile Vite in Dev / Prod
  const isProd = process.env.NODE_ENV === 'production' || !fs.existsSync(path.resolve(__dirname, 'index.html'));

  if (!isProd) {
    console.log('Starting server in Development Mode with Vite Middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    
    app.use(vite.middlewares);

    app.use('*', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const url = req.originalUrl;
        let html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        html = await vite.transformIndexHtml(url, html);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        next(e);
      }
    });
  } else {
    console.log('Starting server in Production Mode serving static assets...');
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    
    app.use('*', (req: Request, res: Response) => {
      const indexPath = path.resolve(distPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Application is building... Please refresh in a moment.');
      }
    });
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`TG Global backend server listening on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

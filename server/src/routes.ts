import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

 export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
    );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })
  /* await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Romário Alves <romariogn@gmail.com>',
    subject: "Novo Feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
    ].join('\n')
  }); */


  return res.status(201).send();
});
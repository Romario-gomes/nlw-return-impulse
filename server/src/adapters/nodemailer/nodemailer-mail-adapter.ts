import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d33ceabcc330f9",
    pass: "e2307e17370ddf"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData): Promise<void> {
     await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Romário Alves <romariogn@gmail.com>',
    subject,
    html: body
  });
  };

}
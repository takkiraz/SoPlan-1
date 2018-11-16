import { IsNotEmpty } from 'class-validator';

import { FormElement, Input } from './formBuilder.class';

export class AdminLogin {
  username: string;
  password: string;
}

export class CustomEMail {
  @IsNotEmpty()
  from: string;

  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  html: string;
}

export class DatabaseConfig {
  @IsNotEmpty()
  host: string;

  @IsNotEmpty()
  port: number | string;

  @IsNotEmpty()
  username: string;

  password: string;

  @IsNotEmpty()
  database: string;
}

const DatabaseConfigSchema: FormElement[] = [
  {
    name: 'Host',
    member: 'host',
    element: new Input('text')
  },
  {
    name: 'Port',
    member: 'port',
    element: new Input('text')
  },
  {
    name: 'Benutzername',
    member: 'username',
    element: new Input('text')
  },
  {
    name: 'Passwort',
    member: 'password',
    element: new Input('password')
  },
  {
    name: 'Datenbank',
    member: 'database',
    element: new Input('text')
  }
];
export { DatabaseConfigSchema };

export class MailConfig {
  @IsNotEmpty()
  host: string;

  @IsNotEmpty()
  port: number;

  @IsNotEmpty()
  user: string; // username

  @IsNotEmpty()
  pass: string; // password
}
const MailConfigSchema: FormElement[] = [
  {
    name: 'Host',
    member: 'host',
    element: new Input('text')
  },
  {
    name: 'Port',
    member: 'port',
    element: new Input('text')
  },
  {
    name: 'Benutzer',
    member: 'user',
    element: new Input('text')
  },
  {
    name: 'Passwort',
    member: 'pass',
    element: new Input('password')
  }
];
export { MailConfigSchema };
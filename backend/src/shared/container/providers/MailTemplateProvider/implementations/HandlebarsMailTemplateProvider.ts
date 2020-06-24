import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseEmailTemplateDTO): Promise<string> {
    const templateFileCotent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const templateDelegate = handlebars.compile(templateFileCotent);

    return templateDelegate(variables);
  }
}

export default HandlebarsMailTemplateProvider;

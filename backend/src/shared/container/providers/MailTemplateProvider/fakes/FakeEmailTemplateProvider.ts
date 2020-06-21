import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class FakeEmailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseEmailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeEmailTemplateProvider;

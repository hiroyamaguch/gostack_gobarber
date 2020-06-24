import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class FakeEmailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Email Fake';
  }
}

export default FakeEmailTemplateProvider;

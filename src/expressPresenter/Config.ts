import CommonExpressConfig from 'jscommons/dist/expressPresenter/Config';
import Service from '../serviceFactory/Service';
import Translator from '../translatorFactory/Translator';

interface Config extends CommonExpressConfig {
  llClientInfoEndpoint: string;
  service: Service;
  translator: Translator;
}

export default Config;

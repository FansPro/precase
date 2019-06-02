import I18n, { setLocale } from 'react-native-redux-i18n'
import translations from './translations'

I18n.fallbacks = true;
I18n.translations = translations


export default I18n;
export default class Logger {
  static info(msg) {
    console.log(`🟢 ${msg}`);
  }
  static warn(msg) {
    console.log(`🟡 ${msg}`);
  }
  static error(msg) {
    console.error(`🔴 ${msg}`);
  }
  static note(msg) {
    console.log(`⚠️  ${msg}`);}
    
  static divider() {
    console.log('——————————————————————');
  }
}

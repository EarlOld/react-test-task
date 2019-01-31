export default class IDGenerator {
    length = 8;
    timestamp = +new Date;

    _getRandomInt( min, max ) {
       return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }

    generate() {
        const ts = this.timestamp.toString();
        const parts = ts.split('').reverse();
        let id = '';

        for( let i = 0; i < this.length; ++i ) {
           const index = this._getRandomInt( 0, parts.length - 1 );
           id += parts[index];
        }

        return id;
    }
}

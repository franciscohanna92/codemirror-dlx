(function (mod) {
    if (typeof exports == 'object' && typeof module == 'object') // CommonJS
        mod(require('codemirror'));
    else if (typeof define == 'function' && define.amd) // AMD
        define(['codemirror'], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function (CodeMirror) {
    'use strict';

    CodeMirror.defineMode('dlx', function (config, parserConfig) {
        function words(str) {
            let obj = {}, words = str.split(' ');
            for (let i = 0; i < words.length; ++i) obj[words[i]] = true;
            return obj;
        }

        const styles = {
            command: 'command',
            register: 'register',
            immediate: 'immediate',
            comment: 'comment',
            marker: 'marker',
            address: 'address'
        }

        const keywords = words(`ADDI ADD ANDI AND BEQZ BNEZ J JAL JALR JR LW
                            ORI OR SEQI SEQ SLEI SLE SLLI SLL SLTI SLT SNEI SNE
                            SRAI SRA SRLI SRL SUBI SUB SW XORI XOR HALT TRAP
                            MULT`);

        function tokenBase(stream, state) {
            if (stream.peek() == ';') {
                stream.skipToEnd();
                state.marker = false;
                return styles.comment;
            }
            if (stream.sol() && stream.skipTo(':') && stream.eat(':')) {
                return styles.marker;
            }
            let ch = stream.next();
            if (ch == ',') {
                return null;
            }
            if (/R/i.test(ch) && stream.match(/\d+/)) {
                return styles.register;
            }
            if (/#/.test(ch) && (stream.match(/0x[A-Fa-f0-9]+/) || stream.match(/-?\d+/))) {
                return styles.immediate;
            }
            if ((ch == '-' || /\d/.test(ch)) && stream.match(/(\d+)?\(R\d+\)/i)) {
                return styles.address;
            }
            stream.eatWhile(/[\w\$_]/);
            let cur = stream.current().toUpperCase();
            if (keywords.propertyIsEnumerable(cur)) {
                state.marker = true;
                return styles.command;
            } else if (state.marker) {
                return styles.marker;
            }
        }

        return {
            startState() {
                return { marker: false };
            },

            token(stream, state) {
                if (stream.eatSpace()) return null;
                let style = tokenBase(stream, state);
                if (style == 'comment') return style;
                return style;
            }
        };
    });
});

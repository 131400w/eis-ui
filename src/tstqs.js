// let resultOutData = "4E616D653DE69DA8E5AD90E4BA937C5365783DE5A5B37C4E6174696F6E3DE6B1897C426F726E3D32303133313031357C416464726573733DE6B996E58D97E79C81E79B8AE998B3E5B882E8B5ABE5B1B1E58CBAE8A1A1E9BE99E6A1A5E99587E6B0B4E58FA3E5BA99E69D91E9BABBE59BADE9878CE69D91E6B091E7BB843136E58FB77C4944436172644E6F3D3433303930333230313331303135303132377C4772616E74446570743DE79B8AE998B3E5B882E585ACE5AE89E5B180E8B5ABE5B1B1E58886E5B1807C557365724C696665426567696E3D32303230303931387C557365724C696665456E643D32303235303931387C4944547970653D307C50686F746F46696C654E616D653D443A5C5C4B494F534B5C5C446174615C5C4944436172645C5C4944686561642E6A7067";
// const buffer = new ArrayBuffer(resultOutData.length / 2);
// let abuf = new Uint8Array(buffer)
// for (let i = 0; i < resultOutData.length; i += 2) {
//     let num = parseInt(resultOutData[i] + resultOutData[i + 1], 16);
//     abuf[i / 2] = num;
// }
// let msg = String.fromCodePoint.apply(null, abuf);
// console.log("************" + msg);
// this.etcNo = msg.substring(24, 40);

// let hex = "4E616D653DE69DA8E5AD90E4BA937C5365783DE5A5B37C4E6174696F6E3DE6B1897C426F726E3D32303133313031357C416464726573733DE6B996E58D97E79C81E79B8AE998B3E5B882E8B5ABE5B1B1E58CBAE8A1A1E9BE99E6A1A5E99587E6B0B4E58FA3E5BA99E69D91E9BABBE59BADE9878CE69D91E6B091E7BB843136E58FB77C4944436172644E6F3D3433303930333230313331303135303132377C4772616E74446570743DE79B8AE998B3E5B882E585ACE5AE89E5B180E8B5ABE5B1B1E58886E5B1807C557365724C696665426567696E3D32303230303931387C557365724C696665456E643D32303235303931387C4944547970653D307C50686F746F46696C654E616D653D443A5C5C4B494F534B5C5C446174615C5C4944436172645C5C4944686561642E6A7067";
// var str = '';
// for (var i = 0;
//     (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
//     str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
// var result = decodeURIComponent(escape(str));

// console.log("************" + result);

// let detail = {};
// if (result) {
//     // let array = datas.split(spliter || "|");
//     let array = result.split("|");
//     array.forEach(element => {
//         // let splitedElem = element.split(secSpliter || "=");
//         let splitedElem = element.split("=");
//         detail[splitedElem[0]] = splitedElem[1];
//     });
// }
// console.log("************" + JSON.stringify(detail));

//
// function Utf8ArrayToStr(array) {
//     var out, i, len, c;
//     var char2, char3;

//     out = "";
//     len = array.length;
//     i = 0;
//     while (i < len) {
//         c = array[i++];
//         switch (c >> 4) {
//             case 0:
//             case 1:
//             case 2:
//             case 3:
//             case 4:
//             case 5:
//             case 6:
//             case 7:
//                 // 0xxxxxxx
//                 out += String.fromCharCode(c);
//                 break;
//             case 12:
//             case 13:
//                 // 110x xxxx   10xx xxxx
//                 char2 = array[i++];
//                 out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
//                 break;
//             case 14:
//                 // 1110 xxxx  10xx xxxx  10xx xxxx
//                 char2 = array[i++];
//                 char3 = array[i++];
//                 out += String.fromCharCode(((c & 0x0F) << 12) |
//                     ((char2 & 0x3F) << 6) |
//                     ((char3 & 0x3F) << 0));
//                 break;
//         }
//     }

//     return out;
// }


// let resultOutData = "4E616D653DE69DA8E5AD90E4BA937C5365783DE5A5B37C4E6174696F6E3DE6B1897C426F726E3D32303133313031357C416464726573733DE6B996E58D97E79C81E79B8AE998B3E5B882E8B5ABE5B1B1E58CBAE8A1A1E9BE99E6A1A5E99587E6B0B4E58FA3E5BA99E69D91E9BABBE59BADE9878CE69D91E6B091E7BB843136E58FB77C4944436172644E6F3D3433303930333230313331303135303132377C4772616E74446570743DE79B8AE998B3E5B882E585ACE5AE89E5B180E8B5ABE5B1B1E58886E5B1807C557365724C696665426567696E3D32303230303931387C557365724C696665456E643D32303235303931387C4944547970653D307C50686F746F46696C654E616D653D443A5C5C4B494F534B5C5C446174615C5C4944436172645C5C4944686561642E6A7067";
// const buffer = new ArrayBuffer(resultOutData.length / 2);
// let abuf = new Uint8Array(buffer)
// for (let i = 0; i < resultOutData.length; i += 2) {
//     let num = parseInt(resultOutData[i] + resultOutData[i + 1], 16);
//     abuf[i / 2] = num;
// }
// let msg = Utf8ArrayToStr(abuf) //String.fromCharCode(abuf);
// console.log("************" + msg);
// this.etcNo = msg.substring(24, 40);

// 引入sha1
// const sha1 = require("sha1");
// const shaStr = sha1("123245");
// console.log(JSON.stringify(shaStr));



const qs = require("qs");
let query = qs.stringify({
    filters: {
        type: {
            $eq: "1"
        }
    }
}, {
    encodeValuesOnly: true,
})
console.log(query);



'use strict';

var e, t;
new function(e) {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+<>,./?[{()}]!@#$%^&*~`|".split(""),
        n = e.querySelector(".source"),
        o = e.querySelector(".target");
    let r, i, l, s = 0;
    this.start = function() {
        n.style.display = "none", o.style.display = "block",
         r = window.setInterval((() => {
            s <= n.innerText.length && (o.innerText = n.innerText.substring(0, s) + function(e) {
                let n = "";
                for (let o = 0; o < e; o++) n += 
                t[Math.floor(Math.random() * t.length)];
                return n
            }(n.innerText.length - s))
        }), 15), i = window.setTimeout((() => {
            l = window.setInterval((() => {
                s > n.innerText.length - 1 && this.stop(), s++
            }), 70)
        }), 350)
    }, this.stop = function() {
        n.style.display = "block", o.style.display = "none",
        o.innerText = "", s = 0, void 0 !== r && (window.clearInterval(r), r = void 0),
        void 0 !== l && (window.clearInterval(l), l = void 0),
        void 0 !== i && (window.clearInterval(i), i = void 0)
    }
}(document.getElementById("error_text")).start(), "en" !== navigator.language.substring(0, 2).toLowerCase() && (e = document.createElement("script"), t = document.body, e.src = "", e.async = e.defer = !0, e.addEventListener("load", (() => t.removeChild(e))), t.appendChild(e));

var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = `
    @import url("https://fonts.googleapis.com/css2?family=PT+Serif&family=Poppins:wght@200&display=swap");

    body,
    html {
        margin: 0;
        background-color: #222;
        color: #aaa;
        font-family: "Poppins", sans-serif;
        font-size: 0
    }

    .full-height {
        height: 100vh
    }

    .flex-center {
        align-items: center;
        display: flex;
        justify-content: center
    }

    #error_text {
        font-size: 32px
    }

    button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #2b3031;
        border: none;
        color: #fff;
        border-radius: 4px;
        margin-top: 10px;
        font-size: 16px;
        cursor: pointer;
        transition: all .3s ease-in-out
    }

    button:hover {
        background-color: #555
    }
`;
document.head.appendChild(style);

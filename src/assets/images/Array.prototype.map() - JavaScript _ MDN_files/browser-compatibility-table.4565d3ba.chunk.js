(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{125:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return $}));var r=n(5),a=n(3),s=n(25),c=n(0),o=n(1),i=n.n(o),l=n(2),d=i.a.createContext(null);function b(e){var t=e.id,n=Object(o.useContext)(d);if(!n)throw new Error("Missing browser info");return Object(c.jsx)(c.Fragment,{children:n[t].name})}function p(e){var t=e.id,n=Object(o.useContext)(d);if(!n)throw new Error("Missing browser info");return Object(c.jsx)(c.Fragment,{children:n[t].preview_name})}var u=n(26),j=n(27),m=n(28),h=n(29),f=function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(u.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={error:null},e}return Object(j.a)(n,[{key:"componentDidCatch",value:function(e,t){this.setState({error:e})}},{key:"render",value:function(){return this.state.error?Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("div",{className:"bc-table-error-boundary",children:"Unfortunately, this table has encountered unhandled error and the content cannot be shown."})}):this.props.children}}]),n}(i.a.Component);function x(e){return Array.isArray(e)?e[0]:e}function O(e){return Array.isArray(e)?e:[e]}function v(e){return Boolean(e)}function w(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=[];n&&e.__compat&&r.push({name:n,compat:e.__compat,isRoot:!0});for(var c=0,o=Object.entries(e);c<o.length;c++){var i=Object(a.a)(o[c],2),l=i[0],d=i[1];"__compat"!==l&&d.__compat&&(r.push({name:t?"".concat(t,".").concat(l):l,compat:d.__compat,isRoot:""!==t}),r.push.apply(r,Object(s.a)(w(d,l))))}return r}function g(e){if(!e)return"unknown";var t,n=x(e),r=n.flags,a=n.version_added,s=n.version_removed,c=n.partial_implementation;return null===a?t="unknown":"preview"===a?t="preview":a?(t="yes",(s||r&&r.length)&&(t="no")):t="no",c&&!s&&(t="partial"),t}function _(e){var t=e.status,n=[t.experimental&&{title:"Experimental. Expect behavior to change in the future.",text:"Experimental",iconClassName:"ic-experimental"},t.deprecated&&{title:"Deprecated. Not for use in new websites.",text:"Deprecated",iconClassName:"ic-deprecated"},!t.standard_track&&{title:"Non-standard. Expect poor cross-browser support.",text:"Non-standard",iconClassName:"ic-non-standard"}].filter(v);return 0===n.length?null:Object(c.jsx)("div",{className:"bc-icons",children:n.map((function(e){return Object(c.jsxs)("abbr",{className:"only-icon",title:e.title,children:[Object(c.jsx)("span",{children:e.text}),Object(c.jsx)("i",{className:e.iconClassName})]},e.iconClassName)}))})}function y(e,t){return"string"!==typeof e?Object(c.jsx)(c.Fragment,{children:"?"}):e.startsWith("\u2264")?Object(c.jsx)(c.Fragment,{children:e.slice(1)}):"preview"===e?Object(c.jsx)(p,{id:t}):Object(c.jsx)(c.Fragment,{children:e})}var N=i.a.memo((function(e){var t,n,r=e.support,a=e.browser,s=x(r),o=s&&s.version_added,i=s&&s.version_removed;switch(o){case null:t={isSupported:"unknown"};break;case!0:t={isSupported:"yes"};break;case!1:t={isSupported:"no"};break;case"preview":t={isSupported:"preview"};break;default:t={isSupported:"yes",label:y(o,a)}}i?t={isSupported:"no",label:Object(c.jsxs)(c.Fragment,{children:[y(o,a),"\u200a\u2013\u200a",y(i,a)]})}:s&&s.partial_implementation&&(t={isSupported:"partial",label:"string"===typeof o?y(o,a):"Partial"});var l="";switch(t.isSupported){case"yes":l="Full support",n=t.label||"Yes";break;case"partial":l="Partial support",n=t.label||"Partial";break;case"no":l="No support",n=t.label||"No";break;case"preview":l="Preview browser support",n=Object(c.jsx)(p,{id:a});break;case"unknown":l="Compatibility unknown; please update this.",n="?"}return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("abbr",{className:"bc-level-".concat(g(s)," only-icon"),title:l,children:Object(c.jsx)("span",{children:l})}),Object(c.jsx)("span",{children:n})]})}));function k(e){var t=e.name;return Object(c.jsxs)("abbr",{className:"only-icon",title:t,children:[Object(c.jsx)("span",{children:t}),Object(c.jsx)("i",{className:"ic-".concat(t)})]})}function F(e){var t=x(e.support);return t?Object(c.jsxs)("div",{className:"bc-icons",children:[t.prefix&&Object(c.jsx)(k,{name:"prefix"}),t.alternative_name&&Object(c.jsx)(k,{name:"altname"}),t.flags&&Object(c.jsx)(k,{name:"disabled"}),t.notes&&Object(c.jsx)(k,{name:"footnote"})]}):null}function C(e){var t=e.supportItem,n=e.browser,r=Object(o.useContext)(d);if(!r)throw new Error("Missing browser info");var a=r[n],s="string"===typeof t.version_added,l="string"===typeof t.version_removed,b=t.flags||[];return Object(c.jsxs)(c.Fragment,{children:[s&&"From version ".concat(t.version_added),l&&Object(c.jsxs)(c.Fragment,{children:[s?" until":"Until"," version"," ",t.version_removed," (exclusive)"]}),s||l?": this":"This"," feature is behind the",b.map((function(e,t){var n=e.value_to_set&&Object(c.jsxs)(c.Fragment,{children:[" ","(needs to be set to ",Object(c.jsx)("code",{children:e.value_to_set}),")"]});return Object(c.jsxs)(i.a.Fragment,{children:[Object(c.jsx)("code",{children:e.name}),"preference"===e.type&&Object(c.jsxs)(c.Fragment,{children:[" preferences",n]}),"runtime_flag"===e.type&&Object(c.jsxs)(c.Fragment,{children:[" runtime flag",n]}),t<b.length-1&&" and the "]},e.name)})),".",a.pref_url&&b.some((function(e){return"preference"===e.type}))&&" To change preferences in ".concat(a.name,", visit ").concat(a.pref_url,".")]})}function S(e,t,n){return O(t).flatMap((function(t,n){var r=[t.version_removed?{iconName:"footnote",label:Object(c.jsxs)(c.Fragment,{children:["Removed in ",y(t.version_removed,e)," ","and later"]})}:null,t.partial_implementation?{iconName:"footnote",label:"Partial support"}:null,t.prefix?{iconName:"footnote",label:"Implemented with the vendor prefix: ".concat(t.prefix)}:null,t.alternative_name?{iconName:"footnote",label:"Alternate name: ".concat(t.alternative_name)}:null,t.flags?{iconName:"footnote",label:Object(c.jsx)(C,{browser:e,supportItem:t})}:null,t.notes?(Array.isArray(t.notes)?t.notes:[t.notes]).map((function(e){return{iconName:"footnote",label:e}})):null,"preview"===t.version_added?{iconName:"footnote",label:"Preview browser support"}:null,0===Object.keys(t).filter((function(e){return!["version_added","release_date"].includes(e)})).length&&"preview"!==t.version_added?{iconName:"footnote",label:"Full support"}:null].flat().filter(v),a=r.length>0;return(0===n||a)&&Object(c.jsx)(i.a.Fragment,{children:Object(c.jsxs)("div",{className:"bc-notes-wrapper",children:[Object(c.jsxs)("dt",{className:"bc-supports-".concat(g(t)," bc-supports"),children:[Object(c.jsx)(N,{support:t,browser:e}),Object(c.jsx)(F,{support:t})]}),r.map((function(e,t){var n=e.iconName,r=e.label;return Object(c.jsxs)("dd",{children:[Object(c.jsx)(k,{name:n})," ","string"===typeof r?Object(c.jsx)("span",{dangerouslySetInnerHTML:{__html:r}}):r]},t)})),!a&&Object(c.jsx)("dd",{})]})},n)})).filter(v)}function E(e){var t=e.browser,n=e.support,a=e.showNotes,s=e.onToggle,o=(e.locale,g(n)),i=function(e){if(e)return x(e).release_date}(n),l=n&&(O(n).length>1||O(n).some((function(e){return e.prefix||e.notes||e.alternative_name||e.flags})));return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("td",{className:"bc-browser-".concat(t," bc-supports-").concat(o," ").concat(l?"bc-has-history":""),"aria-expanded":a?"true":"false",tabIndex:l?0:void 0,onClick:l?function(){s()}:void 0,title:i?"Released ".concat(i):void 0,children:[Object(c.jsx)("span",{className:"bc-browser-name",children:Object(c.jsx)(b,{id:t})}),Object(c.jsx)(N,Object(r.a)(Object(r.a)({},{support:n}),{},{browser:t})),Object(c.jsx)(F,{support:n}),l&&Object(c.jsxs)("button",{type:"button",title:"Open implementation notes",className:"bc-history-link only-icon ".concat(a?"bc-history-link-inverse":""),children:[Object(c.jsx)("span",{children:"Open"}),Object(c.jsx)("i",{className:"ic-history","aria-hidden":"true"})]}),a&&Object(c.jsx)("dl",{className:"bc-notes-list bc-history bc-history-mobile",children:S(t,n)})]})})}var T=i.a.memo((function(e){var t,n=e.index,r=e.feature,a=e.browsers,s=e.activeCell,o=e.onToggleCell,i=e.locale,l=r.name,d=r.compat,b=r.isRoot,p=d.description?Object(c.jsx)("span",{dangerouslySetInnerHTML:{__html:d.description}}):Object(c.jsx)("code",{children:l}),u=null!==s?a[s]:null;return t=d.bad_url&&d.mdn_url?Object(c.jsxs)("div",{className:"bc-table-row-header",children:[Object(c.jsx)("abbr",{className:"new",title:"".concat(d.mdn_url," does not exist"),children:p}),d.status&&Object(c.jsx)(_,{status:d.status})]}):d.mdn_url&&!b?Object(c.jsxs)("a",{href:d.mdn_url,className:"bc-table-row-header",children:[p,d.status&&Object(c.jsx)(_,{status:d.status})]}):Object(c.jsxs)("div",{className:"bc-table-row-header",children:[p,d.status&&Object(c.jsx)(_,{status:d.status})]}),Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{scope:"row",children:t}),a.map((function(e,t){return Object(c.jsx)(E,{browser:e,support:d.support[e],showNotes:s===t,onToggle:function(){return o([n,t])},locale:i},e)}))]}),u&&Object(c.jsx)("tr",{className:"bc-history",children:Object(c.jsx)("td",{colSpan:a.length+1,children:Object(c.jsx)("dl",{className:"bc-notes-list",children:S(u,d.support[u])})})})]})})),R={desktop:["chrome","edge","firefox","ie","opera","safari"],mobile:["webview_android","chrome_android","firefox_android","opera_android","safari_ios","samsunginternet_android"],server:["deno","nodejs"],"webextensions-desktop":["chrome","edge","firefox","opera","safari"],"webextensions-mobile":["firefox_android","safari_ios"]};function A(e){var t=e.platforms,n=e.browsers;return Object(c.jsxs)("tr",{className:"bc-platforms",children:[Object(c.jsx)("td",{}),t.map((function(e){var t=R[e].filter((function(e){return n.includes(e)})),r=Object.keys(t).length,a=e.replace("webextensions-","");return Object(c.jsx)("th",{className:"bc-platform-".concat(a),colSpan:r,title:e,children:Object(c.jsx)("span",{children:e})},e)}))]})}function D(e){var t=e.browsers;return Object(c.jsxs)("tr",{className:"bc-browsers",children:[Object(c.jsx)("td",{}),t.map((function(e){return Object(c.jsx)("th",{className:"bc-browser-".concat(e),children:Object(c.jsx)("span",{className:"bc-head-txt-label bc-head-icon-".concat(e),children:Object(c.jsx)(b,{id:e})})},e)}))]})}function I(e){var t=e.platforms,n=e.browsers;return Object(c.jsxs)("thead",{children:[Object(c.jsx)(A,{platforms:t,browsers:n}),Object(c.jsx)(D,{browsers:n})]})}var P=n(15),M={yes:"Full support",partial:"Partial support",no:"No support",unknown:"Compatibility unknown",experimental:"Experimental. Expect behavior to change in the future.","non-standard":"Non-standard. Check cross-browser support before using.",deprecated:"Deprecated. Not for use in new websites.",footnote:"See implementation notes.",disabled:"User must explicitly enable this feature.",altname:"Uses a non-standard name.",prefix:"Requires a vendor prefix or different name for use."};function U(e,t){var n,r=new Set,a=Object(P.a)(w(e,"",t));try{for(a.s();!(n=a.n()).done;){var s=n.value,c=s.compat.status;c&&(c.experimental&&r.add("experimental"),c.deprecated&&r.add("deprecated"),c.standard_track||r.add("non-standard"));for(var o=0,i=Object.values(s.compat.support);o<i.length;o++){var l=i[o];if(l){var d,b=Object(P.a)(O(l));try{for(b.s();!(d=b.n()).done;){var p=d.value;p.version_added?p.flags&&p.flags.length?r.add("no"):r.add("yes"):null==p.version_added?r.add("unknown"):r.add("no"),p.partial_implementation&&r.add("partial"),p.prefix&&r.add("prefix"),p.notes&&r.add("footnote"),p.alternative_name&&r.add("altname"),p.flags&&r.add("disabled")}}catch(u){b.e(u)}finally{b.f()}}else r.add("no")}}}catch(u){a.e(u)}finally{a.f()}return Object.keys(M).filter((function(e){return r.has(e)})).map((function(e){return[e,M[e]]}))}function L(e){var t=e.compat,n=e.name;return Object(c.jsxs)("section",{className:"bc-legend",children:[Object(c.jsx)("h3",{className:"visually-hidden",id:"Legend",children:"Legend"}),Object(c.jsx)("dl",{className:"bc-legend-items-container",children:U(t,n).map((function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return["yes","partial","no","unknown"].includes(n)?Object(c.jsxs)("div",{className:"bc-legend-item",children:[Object(c.jsx)("dt",{children:Object(c.jsx)("span",{className:"bc-supports-".concat(n," bc-supports"),children:Object(c.jsx)("abbr",{className:"bc-level bc-level-".concat(n," only-icon"),title:r,children:Object(c.jsx)("span",{children:r})})})},n),Object(c.jsx)("dd",{children:r})]},n):Object(c.jsxs)("div",{className:"bc-legend-item",children:[Object(c.jsx)("dt",{children:Object(c.jsx)("abbr",{className:"only-icon legend-icons ic-".concat(n),title:r})}),Object(c.jsx)("dd",{children:r})]},n)}))})]})}function H(e){var t=e.features,n=e.browsers,s=e.locale,i=Object(o.useReducer)((function(e,t){var n=Object(a.a)(e,2),r=n[0],s=n[1],c=Object(a.a)(t,2),o=c[0],i=c[1];return r===o&&s===i?[null,null]:[o,i]}),[null,null]),l=Object(a.a)(i,2),d=Object(a.a)(l[0],2),b=d[0],p=d[1],u=l[1];return Object(c.jsx)(c.Fragment,{children:t.map((function(e,t){return Object(c.jsx)(T,Object(r.a)(Object(r.a)({},{feature:e,browsers:n}),{},{index:t,activeCell:b===t?p:null,onToggleCell:function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];u([n,r])},locale:s}),t)}))})}function $(e){var t=e.query,n=e.data,o=e.browsers,i=e.locale,b=Object(l.f)();if(!n||!Object.keys(n).length)throw new Error("BrowserCompatibilityTable component called with empty data");var p=t.split("."),u=p[0],j=p[p.length-1],m=function(e,t){var n=t.__compat&&"nodejs"in t.__compat.support,r=t.__compat&&"deno"in t.__compat.support,a=["desktop","mobile"];"javascript"===e||n||r?a.push("server"):"webextensions"===e&&(a=["webextensions-desktop","webextensions-mobile"]);var c=new Set(a.map((function(e){return R[e]||[]})).flat());return"javascript"===e||n||c.delete("nodejs"),[a,Object(s.a)(c)]}(u,n),h=Object(a.a)(m,2),x=h[0],O=h[1];return Object(c.jsx)(f,{children:Object(c.jsxs)(d.Provider,{value:o,children:[Object(c.jsx)("a",{className:"bc-github-link external external-icon",href:function(){var e=new URLSearchParams,n="\n\x3c!-- Tips: where applicable, specify browser name, browser version, and mobile operating system version --\x3e\n\n#### What information was incorrect, unhelpful, or incomplete?\n\n#### What did you expect to see?\n\n#### Did you test this? If so, how?\n\n\n\x3c!-- Do not make changes below this line --\x3e\n<details>\n<summary>MDN page report details</summary>\n\n* Query: `$QUERY_ID`\n* MDN URL: https://developer.mozilla.org$PATHNAME\n* Report started: $DATE\n\n</details>\n".replace(/\$PATHNAME/g,b.pathname).replace(/\$DATE/g,(new Date).toISOString()).replace(/\$QUERY_ID/g,t).trim();return e.set("body",n),e.set("title","".concat(t," - <PUT TITLE HERE>")),"".concat("https://github.com/mdn/browser-compat-data/issues/new","?").concat(e.toString())}(),target:"_blank",rel:"noopener noreferrer",title:"Report an issue with this compatibility data",children:"Report problems with this compatibility data on GitHub"}),Object(c.jsxs)("table",{className:"bc-table bc-table-web",children:[Object(c.jsx)(I,Object(r.a)({},{platforms:x,browsers:O})),Object(c.jsx)("tbody",{children:Object(c.jsx)(H,{browsers:O,features:w(n,"",j),locale:i})})]},"bc-table"),Object(c.jsx)(L,{compat:n,name:j}),Object(c.jsxs)("div",{className:"hidden",children:["The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out"," ",Object(c.jsx)("a",{href:"https://github.com/mdn/browser-compat-data",children:"https://github.com/mdn/browser-compat-data"})," ","and send us a pull request."]})]})})}}}]);
//# sourceMappingURL=browser-compatibility-table.4565d3ba.chunk.js.map
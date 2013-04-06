//kodmunki utilities
(function(f){if(!f){f={}}f.isArray=function(B){return B instanceof Array};f.isBool=function(B){return(/boolean/i.test(typeof(B)))};f.isDate=function(B){return B instanceof Date};f.isEm=function(B){return(/\d+em/i.test(B))};f.isEvent=function(B){try{return B instanceof Event}catch(C){return B===window.event}};f.isNumber=function(B){return(/number/i.test(typeof(B)))&&!isNaN(B)};f.isObject=function(B){return f.exists(B)&&(/object/i.test(typeof(B)))};f.isFunction=function(B){return(B instanceof Function)};f.isPercent=function(B){return(/\d+%/.test(B))};f.isPixel=function(B){return(/\d+px/.test(B))};f.isString=function(B){return(/string/i.test(typeof(B)))||B instanceof String};f.isZero=function(B){return B===0};f.isEven=function(B){return(f.isNullOrEmpty(B)||f.isDate(B))?false:(isNaN(B)?false:(f.isZero(B)?false:B%2===0))};f.isOdd=function(B){return(f.isNullOrEmpty(B)||f.isDate(B))?false:(isNaN(B)?false:(f.isZero(B)?false:!f.isEven(B)))};f.isNull=function(B){return B===null};f.isUndefined=function(B){return(/undefined/i.test(typeof(B)))};f.isEmpty=function(B){return f.isString(B)&&f.isZero(B.split(/\B/).length)};f.isNullOrEmpty=function(B){return !f.exists(B)||f.isEmpty(B)};f.exists=function(B){return(B!==null)&&(!f.isUndefined(B))};f.xor=function(C,B){return !C!=!B};f.isDecendentOf=function(D,E){var C=f.ele(D),B=f.ele(E);if((!C||!B)||(C==B)){return false}do{if(C==B){return true}}while(C=C.parentNode);return false};f.ext=function(C,B){if(!C||!B){return null}var D=function(){};D.prototype=B.prototype;C.base=B;C.prototype=f.obj.merge(C.prototype,new D());C.prototype.constructor=C;return C};f.math={round:function(E,D){var C=D||0,B=Math.pow(10,-C);return Math.round(parseFloat((E*B).toFixed(Math.abs(C))))/B},roundUp:function(E,D){var C=D||0,B=5*(Math.pow(10,C-1));return f.math.round(E+B,D)},roundDown:function(E,D){var C=D||0,B=5*(Math.pow(10,C-1));return f.math.round(E-B,D)},factorial:function(D){var B=D,C=D;while(C--){if(!!C){B*=C}}return B},divide:function(C,B){var D=f.isNumber(C)&&f.isNumber(B)&&!f.isZero(B);if(!D){throw new Error(f.str.format("Invalid division. value: {0}/{1} | type: {2}/{3}",C,B,typeof C,typeof B))}return C/B}};f.obj={keys:function(C){var B=[];for(n in C){B[B.length]=n}return B},values:function(C){var B=[];for(n in C){B[B.length]=C[n]}return B},count:function(B){var C=0;for(n in B){C++}return C},hasProp:function(B,C){return(f.exists(B.hasOwnProperty))?B.hasOwnProperty(C):false},merge:function(C,B){var D=f.replicate(B);for(n in C){D[n]=C[n]}return D},meld:function(D,C){var B=f.replicate(C);for(n in D){if(f.exists(B[n])){continue}B[n]=D[n]}return B}};f.replicate=function(D){var B=(f.isDate(D))?new Date(D):(f.isArray(D))?[]:(f.isObject(D))?{}:D,C;for(n in D){C=D[n];B[n]=((f.isArray(C))||(f.isObject(C)))?f.replicate(C):C}return B};f.str={build:function(){return"".concat.apply(new String(),arguments)},format:function(){var D=arguments,F=D[0],C=D.length,B,E;for(i=1;i<C;i++){B=D[i];E=(f.isNull(B))?"null":(f.isUndefined(B))?"undefined":B.toString();F=F.replace(RegExp("\\{"+(i-1)+"\\}","g"),E)}return F},parse:function(){return String.fromCharCode.apply(String,arguments)},trim:function(B){return f.str.trimStart(f.str.trimEnd(B))},trimStart:function(B){if(!f.isString(B)){throw new Error("Cannot trim non-string values")}return(f.exists(B.replace))?B.replace(/^\s*\b/,""):B},trimEnd:function(B){if(!f.isString(B)){throw new Error("Cannot trim non-string values")}return(f.exists(B.replace))?B.replace(/\b\s*$/,""):B}};f.uid=function(D){var C=D||"kuid",B=Math.random().toString().replace(/\b\.\b/,"");return f.str.format("{0}{1}",C,B)};kodmunki={};f.Class=function(){};f.Class.prototype={get:function(B){return this["_"+B]},set:function(C,B){this["_"+C]=B;return this},property:function(C,B){return(f.isUndefined(B))?this.get(C):this.set(C,B)}};function c(B){c.base.call(this);var C=(!f.exists(B)||!B.toObject)?B:B.toObject();this.$h=(f.exists(C))?C:{};this._count=0;for(n in this.$h){this._count++}}c.prototype={count:function(){return this.get("count")},add:function(C,B){if(!f.exists(C)||this.containsKey(C)){return this}this.$h[C]=B;this._count++;return this},clear:function(){var B=this.$h;for(n in B){delete B[n]}this._count=0;return this},find:function(B){if(!f.exists(B)){return null}return this.$h[B]},findKey:function(B){if(!f.exists(B)){return null}var C=this.$h;for(n in C){if(C[n]==B){return n}}return null},findValue:function(B){return this.find(B)},quit:function(){this._iterator.quit();return this},each:function(C,B){var D=B||this;this._iterator=f.iterator(this.toObject());this._iterator.each(C,D);return this},isEmpty:function(){return this._count<1},listKeys:function(){return new f.list(f.obj.keys(this.$h))},listValues:function(){return new f.list(f.obj.values(this.$h))},containsKey:function(B){if(!f.exists(B)){return false}return f.exists(this.$h[B])},containsValue:function(C){var B=f.obj.values(this.$h),D=B.length;while(D--){if(B[D]==C){return true}}return false},merge:function(B){return r(this,B,"merge")},meld:function(B){return r(this,B,"meld")},remove:function(B){var C=this.$h;if(!f.exists(B)||!f.exists(C[B])){return this}delete C[B];this._count--;return this},replicate:function(){return f.hash(f.replicate(this.$h))},toObject:function(){return this.$h},update:function(C,B){if(!f.exists(C)){return this}if(!this.containsKey(C)){this._count++}this.$h[C]=B;return this}};f.ext(c,f.Class);function r(D,C,B){var E=(!C.toObject)?C:C.toObject();D.$h=f.obj[B](E,D.$h);D._count=f.obj.count(D.$h);return D}f.hash=function(B){return new c(B)};f.hash.Class=c;function x(C){x.base.call(this);this._keys=[];this._hash=f.hash();this._count=this._keys.length;if(!f.exists(C)){return}var D=0,B=C.length;while(D<B){this.add(C[D]);D++}}x.prototype={count:function(){return this.get("count")},add:function(C){var B=this._keys,D=f.uid();B[B.length]=D;this._hash.add(D,C);this._count=this._keys.length;return this},clear:function(){this._hash.clear();this._keys=[];this._count=this._keys.length;return this},contains:function(B){return this._hash.containsValue(B)},find:function(C){var B=this._keys;return(f.exists(B[C]))?this._hash.find(B[C]):null},quit:function(){this._iterator.quit();return this},each:function(C,B){var D=B||this;this._iterator=f.iterator(this.toArray());this._iterator.each(C,D);return this},isEmpty:function(){return this._count<1},remove:function(D){var C=this._hash,B;if(!this.contains(D)){return this}B=C.findKey(D);this._keys.splice(B,1);C.remove(B);this._count=C.count();return this},toArray:function(){var B=[];this._hash.each(function(C){B.push(C.value)});return B}};f.ext(x,f.Class);f.list=function(B){return new x(B)};f.list.Class=x;f.list.parseArguments=function(B){return new x(Array.prototype.slice.call(B))};function A(B){A.base.call(this);this._isLocked=B||false}A.prototype={isLocked:function(){return this.get("isLocked")},lock:function(){this._isLocked=true},unlock:function(){this._isLocked=false}};f.ext(A,f.Class);f.lock=function(B){return new A(B)};f.lock.Class=A;var l=function(D,E,B,C){this._type=D;this._info=E||"";this._browserTrace=B;this._ku4jTrace=C};l.prototype={message:"",type:function(){return this._type},info:function(){return this._info},browserTrace:function(){return this._browserTrace},ku4jTrace:function(){return this._ku4jTrace},toString:function(){var B="EXCEPTION: {0}: {1}\n\nBowser stack trace:\n{2}\n\nku4j stack:\n{3}";return f.str.format(B,this._type,this._info,this._browserTrace,this._ku4jTrace)},toObject:function(){return{type:this._type,message:this._info,browserTrace:this._browserTrace,ku4jTrace:this._ku4jTrace}}};f.kulog=function(){try{console.log.apply(console,arguments)}catch(B){alert(Array.prototype.slice.call(arguments).join("\n"))}};f.refcheck=function(C,B){if(!f.exists(C)){throw f.exception("null",B)}return C};f.exception=function(F,H){var E={generic:{type:"GENERIC EXCEPTION",message:'Generic exeption. Use $.exeption("[null|arg]") for more detail.'},operation:{type:"OPERATION EXCEPTION",message:"Invalid operation."},"null":{type:"REFERENCE EXCEPTION",message:"Invalid reference to type null or undefined."},arg:{type:"ARGUMENT EXCEPTION",message:"Invalid argument"}},C=arguments.callee.caller,D="",B="",G=(f.exists(E[F]))?E[F]:E.generic,I=(f.exists(H))?" - "+H:"";(function(){try{generate.exeception}catch(L){B=(f.exists(L.stack))?L.stack.replace(/generate is.+/,""):"[Unavailable]";var K=0,M,J;while(C&&(K<10)){M=C.toString().replace(/[\n\t\r\s]+/g," ").substring(0,100);J=M.replace(/\W/g,"a").replace(/\s/g,"").replace(/.*base\.js:216/,"").split(/\B/).length>99?M+"...":M;D+=f.str.format("<kuidx[{0}]>:{1}\n",K,J);C=C.caller;K++}}})();return new l(G.type,G.message+I,B,D)};f.abstractContext=function(B){f.abstractContext.base.call(this);this.state(B)};f.abstractContext.prototype={state:function(B){if(!f.exists(B)){return this._state}return this.set("state",B.context(this))}};f.ext(f.abstractContext,f.Class);f.abstractState=function(B){f.abstractState.base.call(this);this.states(B)};f.abstractState.prototype={context:function(B){return this.property("context",B)},states:function(B){return this.set("states",B)},state:function(B){var C=this._context;C.state(new this._states[B](C));return this}};f.ext(f.abstractState,f.Class);f.abstractVisitor=function(){};f.abstractVisitor.prototype={$visit:function(){throw new Error("visit method is abstract an must be defined.")},subject:function(B){return this.property("subject",f.replicate(B))},visit:function(){return this.$visit()}};function s(B){s.base.call(this);this.$current=0;this._quit=false;this.subject(B)}s.prototype={$hasNext:function(){return f.exists(this._subject[this.$current+1])},$hasPrev:function(){return f.exists(this._subject[this.$current-1])},$each:function(C,D){var B=D||this;this.reset();do{C.call(B,this.current())}while(this.next()&&(!this._quit));this._end=false;this.reset()},$exec:function(D){var B=this._subject,C=B[D];if(!f.exists(C)){return null}this.$current=D;return C},subject:function(C){var B=(f.isArray(C))?C:(f.isObject(C))?y(C):C;if(!f.isUndefined(C)){this.reset()}this.$subject=B;return this.property("subject",B)},current:function(){return this.$exec(this.$current)},next:function(){return this.$exec(this.$current+1)},prev:function(){return this.$exec(this.$current-1)},hasNext:function(){return this.$hasNext()},hasPrev:function(){return this.$hasPrev()},reset:function(){this.$current=0;return this},quit:function(){return this.set("quit",true)},each:function(B,C){if(this._subject.length<1){return this}this.$each(B,C);return this}};function y(B){var C=[];for(n in B){C.push({key:n,value:B[n]})}return C}f.ext(s,f.Class);f.iterator=function(B){return new s(B)};f.iterator.Class=s;function m(){m.base.call(this);this._observers=new f.hash()}m.prototype={subscribe:function(B,F,C,E){var D=this._observers;if(D.containsKey(B)){D.find(B).add(F,C,E)}else{D.add(B,f.observer().add(F,C,E))}return this},unsubscribe:function(B,D){var C=this._observers;if(C.containsKey(B)){C.find(B).remove(D)}return this},notify:function(){var E=f.list.parseArguments(arguments),B=E.find(0),D=!this._observers.containsKey(B),C=!D||(E.count()>1),F=D?B:null,G=E.remove(0);return(C)?this._notify(F,G):this._notifyAll(F);return this},clear:function(){this._observers.each(function(B){B.value.clear()}).clear();return this},isEmpty:function(){return this._observers.isEmpty()},_notifyAll:function(B){this._observers.listValues().each(function(C){C.notify(B)});return this},_notify:function(C,B){var D=this._observers;B.each(function(E){try{D.find(E).notify(C)}catch(F){return}});return this}};f.ext(m,f.Class);f.mediator=function(){return new m()};f.mediator.Class=m;function v(){v.base.call(this);this._methods=new f.hash()}v.prototype={add:function(F,C,E){var B=E||f.uid("observerMethod"),D=C||this;this._methods.add(B,{m:F,s:D});return this},remove:function(B){this._methods.remove(B);return this},clear:function(){this._methods.clear();return this},notify:function(){var C=new f.iterator(this._methods.listValues().toArray()),B=arguments;C.each(function(D){f.refcheck(D.m).apply(D.s,B)});return this},isEmpty:function(){return this._methods.isEmpty()}};f.ext(v,f.Class);f.observer=function(){return new v()};f.observer.Class=v;function b(B){b.base.call(this,B)}b.prototype={$hasNext:function(){var D=this.$subject,B=D.length-1,F=this.$current,E=F+1,C=(E>B)?0:E;return f.exists(D[C])},$hasPrev:function(){var D=this.$subject,B=D.length-1,F=this.$current,E=F+1,C=(E<0)?B:E;return f.exists(D[C])},$each:function(C,D){var B=D||this;this.reset();do{C.call(D,this.current())}while(this.next()&&(this.$current>0));this.reset()},$exec:function(D){var C=this.$subject,B=(C.length-1);this.$current=(D>B)?0:((D<0)?B:D);return C[this.$current]}};f.ext(b,f.iterator.Class);f.rolodex=function(B){return new b(B)};f.rolodex.Class=b;function u(B){this._strategy=B}u.prototype={sort:function(B){return this.$sort(B,this._strategy)},strategy:{asc:function(C,B){var E=this._findSortValue(C),D=this._findSortValue(B);if(!isNaN(E)&&!isNaN(D)){return(E-D)}return((E>D)||!isNaN(D))?1:((E<D)||!isNaN(E))?-1:0},des:function(C,B){var E=this._findSortValue(C),D=this._findSortValue(B);if(!isNaN(E)&&!isNaN(D)){return(D-E)}return((E<D)||!isNaN(E))?1:((E>D)||!isNaN(D))?-1:0}},$sort:function(B,D){var C=this;return B.sort(function(F,E){return D.apply(C,arguments)})},_findSortValue:function(C){var B=(f.exists(C.getValue))?C.getValue():(f.exists(C.value))?C.value:(f.exists(C.nodeName))?f.getText(C):C;if(f.isString(B)){if(B.indexOf("$")!=-1){return f.money.parse(B).value}if(/\d{1,2}\/\d{1,2}\/(\d{2}|\d{2,4})/.test(B)){return new Date(B)}if(/\d{3}-\d{2}-\d{4}/.test(B)){return f.ssn.parse(B)}if(B.indexOf(".")!=-1&&!isNaN(parseFloat(B))){return parseFloat(B)}if(B.search(/([a-z]|[A-Z])+/)==-1&&!isNaN(parseInt(B))){return parseInt(B)}}return B}};function z(){}z.prototype={$isSatisfiedBy:function(B){return},isSatisfiedBy:function(B){return this.$isSatisfiedBy(B)},and:function(B){return new p(this,B)},or:function(B){return new q(this,B)},xor:function(B){return new w(this,B)},not:function(){return new d(this)}};function p(C,B){p.base.call(this);this.$1=C;this.$2=B}p.prototype.$isSatisfiedBy=function(B){return this.$1.isSatisfiedBy(B)&&this.$2.isSatisfiedBy(B)};f.ext(p,z);function q(C,B){q.base.call(this);this.$1=C;this.$2=B}q.prototype.$isSatisfiedBy=function(B){return this.$1.isSatisfiedBy(B)||this.$2.isSatisfiedBy(B)};f.ext(q,z);function w(C,B){w.base.call(this);this.$1=C;this.$2=B}w.prototype.$isSatisfiedBy=function(B){return f.xor(this.$1.isSatisfiedBy(B),this.$2.isSatisfiedBy(B))};f.ext(w,z);function k(){k.base.call(this)}k.prototype.$isSatisfiedBy=function(B){return true};f.ext(k,z);function a(){a.base.call(this)}a.prototype.$isSatisfiedBy=function(B){return false};f.ext(a,z);function d(B){d.base.call(this);this._s=B}d.prototype.$isSatisfiedBy=function(B){return !this._s.isSatisfiedBy(B)};f.ext(d,z);function h(B){h.base.call(this);this.$isSatisfiedBy=B}f.ext(h,z);f.spec=function(B){return new h(B)};function g(){g.base.call(this);this.value}g.prototype={context:function(B){return this.property("context",B)},invoke:function(B){B.toggle()}};f.ext(g,f.Class);function e(){e.base.call(this);this.value}e.prototype={context:function(B){return this.property("context",B)},invoke:function(B){var C=this.context();C.each(function(E){var D=(E===B);E.isActive(D)})}};f.ext(e,f.Class);function t(){t.base.call(this);this._onActive=f.observer();this._onInactive=f.observer();this._isActive=false}t.prototype={value:function(B){return this.property("value",B)},toggleset:function(B){return this.property("toggleset",B)},isActive:function(B){if(f.exists(B)){if(B){this._onActive.notify()}else{this._onInactive.notify()}}return this.property("isActive",B)},toggle:function(){return this.isActive(!this.isActive())},invoke:function(){var B=this._toggleset;if(f.exists(B)){B.invoke(this)}else{this.toggle()}return this},onActive:function(C,B){this._onActive.add(C,B);return this},onInactive:function(C,B){this._onInactive.add(C,B);return this}};f.ext(t,f.Class);f.toggle=function(){return new t()};f.toggle.Class=t;function j(){j.base.call(this);this._toggles=f.list();this._onInvoke=f.observer();this.multipleSelect()}j.prototype={isEmpty:function(){return this._toggles.isEmpty()},strategy:function(B){if(f.exists(B)){B.context(this)}return this.property("strategy",B)},multipleSelect:function(){return this.strategy(new g())},mutuallyExclusive:function(){return this.strategy(new e())},invoke:function(B){this.strategy().invoke(B);return this},add:function(B){this._toggles.add(B.toggleset(this));return this},remove:function(B){this._toggles.remove(B);return this},onInvoke:function(C,B,D){this._onInvoke.add(C,B,D);return this},each:function(C,B){this._toggles.each(C,B);return this}};f.ext(j,f.Class);f.toggleset=function(){return new j()};f.toggleset.Class=j;function o(){}o.prototype={profile:function(E,B){var C=1000,D=(new Date()).getTime();while(C--){E.apply(E,B)}return((new Date()).getTime()-D)/1000}};f.profiler=function(){return new o()}})($);
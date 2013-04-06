//kodmunki utilities
(function(g){if(!g){g={}}function q(z,y,x){function A(B){var C=parseInt(B);if(!(g.isNumber(C)&&C>=0&&C<=255)){throw g.exception("arg",g.str.format("at $.color({0},{1},{2})",z,y,x))}return C}this._red=A(z);this._green=A(y);this._blue=A(x)}q.prototype={red:function(){return this._red},green:function(){return this._green},blue:function(){return this._blue},add:function(y){function z(C){return(C>255)?255:C}var B=z(this.red()+y.red()),A=z(this.green()+y.green()),x=z(this.blue()+y.blue());return g.color(B,A,x)},subtract:function(y){function z(C){return Math.abs(C)}var B=z(this.red()-y.red()),A=z(this.green()-y.green()),x=z(this.blue()-y.blue());return g.color(B,A,x)},multiply:function(y){function z(C){return(C>255)?255:C}var B=z(this.red()*y.red()),A=z(this.green()*y.green()),x=z(this.blue()*y.blue());return g.color(B,A,x)},divide:function(y){function z(C){return isNaN(C)?0:C}var B=z(this.red()/y.red()),A=z(this.green()/y.green()),x=z(this.blue()/y.blue());return g.color(B,A,x)},and:function(y){function z(C){return isNaN(C)?0:C}var B=z(this.red()&&y.red()),A=z(this.green()&&y.green()),x=z(this.blue()&&y.blue());return g.color(B,A,x)},or:function(y){function z(C){return isNaN(C)?0:C}var B=z(this.red()||y.red()),A=z(this.green()||y.green()),x=z(this.blue()||y.blue());return g.color(B,A,x)},mix:function(x){function y(B,A){var z=parseInt(B+(Math.abs(B-A)/2));return z>255?255:z<0?0:z}return g.color(y(this.red(),x.red()),y(this.green(),x.green()),y(this.blue(),x.blue()))},equals:function(x){return(this.red()==x.red())&&(this.green()==x.green())&&(this.blue()==x.blue())},toHex:function(z){function x(A){var B=(new Number(A)).toString(16),C=/[\dA-F]{2}/i.test(B)?B:"0"+B;return C}var y=z||"0x";return g.str.format("{0}{1}{2}{3}",y,x(this.red()),x(this.green()),x(this.blue()))},toCSS:function(){return this.toHex("#")},toRGB:function(){return g.str.format("rgb({0},{1},{2})",this.red(),this.green(),this.blue())},toNumber:function(){return parseInt(this.toHex())}};g.ext(q,g.Class);g.color=function(z,y,x){return new q(z,y,x)};g.color.canParse=function(x){if(g.isString(x)&&/\D/.test(x)){return/^[#(0x)][\dA-F]{6}$/i.test(x)||/^rgb\(\d{1,3}\,\s?\d{1,3}\,\s?\d{1,3}\)$/i.test(x)}var y=parseInt(x);return g.isNumber(y)&&y>=0&&y<=16777215},g.color.parse=function(x){if(x instanceof q){return x}var y=parseInt(x);if(g.isNumber(y)&&y>=0&&y<=16777215){return v(y)}if(/^#[\dA-F]{6}$/i.test(x)){return m(x)}if(/^0x[\dA-F]{6}$/i.test(x)){return s(x)}if(/^rgb/.test(x)){return a(x)}return null};function v(x){return s((new Number(x)).toString(16))}function a(y){var x=y.replace(/[rgb\(\)\s]/g,"").split(",");return g.color(x[0],x[1],x[2])}function m(x){return i(/^#/,x)}function s(x){return i(/^0x/,x)}function i(x,y){var z=y.replace(x,"");return n(z.substr(0,2),z.substr(2,2),z.substr(4,2))}function n(A,z,x){function y(B){return g.isNullOrEmpty(B)?0:g.str.format("0x{0}",B)}return g.color(parseInt(y(A)),parseInt(y(z)),parseInt(y(x)))}function p(z,A){if(!g.isNumber(z)||!g.isNumber(A)){throw g.exception("arg",g.str.format("at $.coord({0},{1})",z,A))}p.base.call(this);this.x(z).y(A)}p.prototype={x:function(y){return this.property("x",y)},y:function(x){return this.property("y",x)},abs:function(){return g.coord(Math.abs(this._x),Math.abs(this._y))},add:function(A){var z=this._x+A.x(),B=this._y+A.y();return g.coord(z,B)},divide:function(A){var z=this._x/A.x(),B=this._y/A.y();return g.coord(z,B)},equals:function(x){return(x instanceof p)&&((this._x===x.x())&&(this._y===x.y()))},multiply:function(A){var z=this._x*A.x(),B=this._y*A.y();return g.coord(z,B)},subtract:function(A){var z=this._x-A.x(),B=this._y-A.y();return g.coord(z,B)},round:function(x){var y=x||0;return g.coord(g.math.round(this.x(),y),g.math.round(this.y(),y))},isAbove:function(x){return this.y()<x.y()},isBelow:function(x){return this.y()>x.y()},isLeftOf:function(x){return this.x()<x.x()},isRightOf:function(x){return this.x()>x.x()},distanceFrom:function(x){return new g.vector(this.x()-x.x(),this.y()-x.y())},distanceTo:function(x){return this.distanceFrom(x).invert()},half:function(){return this.divide(g.coord(2,2))},value:function(){return{x:this._x,y:this._y}},toEm:function(){return k(this,"em")},toPixel:function(){return k(this,"px")},toString:function(){return g.str.format("({0},{1})",this._x,this._y)}};g.ext(p,g.Class);function k(y,x){return{x:function(){return y.x()+x},y:function(){return y.y()+x}}}g.coord=function(z,A){return new p(z,A)};g.coord.Class=p;g.coord.zero=function(){return g.coord(0,0)};g.coord.canParse=function(y){try{if(("left" in y)&&("top" in y)){return !isNaN(y.left)&&!isNaN(y.top)}if(("width" in y)&&("height" in y)){return !isNaN(y.width)&&!isNaN(y.height)}return false}catch(x){return false}};g.coord.random=function(B,A){var z=B*Math.random(),C=A*Math.random(A);return g.coord(z,C)};g.coord.parse=function(x){if(("left" in x)&&("top" in x)){return g.coord(x.left,x.top)}if(("width" in x)&&("height" in x)){return g.coord(x.width,x.height)}return null};g.coord.tryParse=function(x){return g.coord.canParse(x)?g.coord.parse(x):null};function b(C,A,x,D,z,E,y){if((A<1)||(A>12)){throw new g.exception("arg","Invalid month at $.dayPoint")}if((x<1)||(x>j(A,C))){throw new g.exception("arg","Invalid date at $.dayPoint")}this._value=(arguments.length>=3)?new Date(C,A-1,x,D||0,z||0,E||0,y||0):new Date();var F=this._value;function G(H){return H<10?"0"+H:""+H}this._day=F.getDay();this._date=x;this._month=A;this._year=C;this._hour=G(F.getHours());this._minute=G(F.getMinutes());this._second=G(F.getSeconds());this._millisecond=G(F.getMilliseconds());var B=this._day;this._isWeekday=B>0&&B<6;this._isWeekend=!this._isWeekday}b.prototype={value:function(){return this._value},day:function(){return this._day},date:function(){return this._date},month:function(){return this._month},year:function(){return this._year},hour:function(){return this._hour},minute:function(){return this._minute},second:function(){return this._second},millisecond:function(){return this._millisecond},isWeekday:function(){return this._isWeekday},isWeekend:function(){return this._isWeekend},equals:function(x){return this._value==x.value()},nextDay:function(){return d(this,1,0,0)},prevDay:function(){return d(this,-1,0,0)},nextMonth:function(){return d(this,0,1,0)},prevMonth:function(){return d(this,0,-1,0)},nextYear:function(){return d(this,0,0,1)},prevYear:function(){return d(this,0,0,-1)},add:function(D,x,I){function H(y,N,M){var K=y,L=N;while(L--){K=K[M]()}return K}var G=D<0,J=Math.abs,F=J(D),E=J(I),A=J(x),z=G?"prevYear":"nextYear",C=G?"prevDay":"nextDay",B=G?"prevMonth":"nextMonth";return H(H(H(this,F,z),A,B),E,C)},firstDayOfMonth:function(){return new b(this._year,this._month,1)},lastDayOfMonth:function(){return new b(this._year,this._month,j(this._month,this._year))},isBefore:function(x){return !(this.isAfter(x)||this.equals(x))},isAfter:function(y){var x=this._year,A=y.year(),z=this._month,B=y.month();if(x>A){return true}if((x==A)&&(z>B)){return true}if((x==A)&&(z==B)&&(this._date>y.date())){return true}return false},equals:function(x){return(this._year==x.year())&&(this._month==x.month())&&(this._date==x.date())},toString:function(){var B=this._year,x=this._month,A=this._date,z=(x<10&&A<10)?"0{1}/0{2}/{0}":(x<10)?"0{1}/{2}/{0}":(A<10)?"{1}/0{2}/{0}":"{1}/{2}/{0}";return g.str.format(z,B,x,A)},toDate:function(){return this.value()}};g.dayPoint=function(B,C,z,x,A,D,y){if(!(g.isDate(B)||(g.isNumber(B)&&g.isNumber(C)&&g.isNumber(z)))){return null}return new b(B,C,z,x,A,D,y)};g.dayPoint.canParse=function(x){return(g.isString(x)||g.isNumber(x)||g.isDate(x))?!isNaN(new Date(x).valueOf()):false};g.dayPoint.parse=function(G){if(G instanceof b){return G}if(!(g.isDate(G)||this.canParse(G))){return null}var x=new Date(G),F=x.getFullYear(),A=x.getMonth()+1,E=x.getDate(),B=x.getHours(),C=x.getMinutes(),H=x.getSeconds(),z=x.getMilliseconds();return g.dayPoint(F,A,E,B,C,H,z)};g.dayPoint.tryParse=function(x){return g.dayPoint.canParse(x)?g.dayPoint.parse(x):null};var h;g.dayPoint.assumeNow=function(x){h=g.dayPoint.parse(x)};g.dayPoint.today=function(){return h||g.dayPoint.parse(new Date())};function j(A,z){var x=A,B=z;if(x==2){return(r(B))?29:28}return(((x<8)&&(g.isEven(x)))||((x>7)&&(g.isOdd(x))))?30:31}function r(x){var A=x.toString().split(/\B/),z=parseFloat(g.str.build(A[A.length-2],A[A.length-1]));return(z%4==0)}function d(E,J,A,L){var N=E.month(),F=E.year(),C=E.date(),x=j(N,F),M=J,D=A,I=L,z=C+M,H=N+D,K=F+I;if((C+M)>x){z=1;H=(N+(D+1))}if((C+M)<1){var B=E.prevMonth(),z=j(B.month(),B.year());(H=N+(D-1))}if((H)>12){H=1;K=(F+(I+1))}if((H)<1){H=12;K=(F+(I-1))}var G=j(H,K);z=(z>G)?G:z;return new b(K,H,z)}function w(y,A,z,x){if(!g.isNumber(y)){throw g.exception("arg",g.str.format("Invalid parameter: code {0}",y))}this._code=y;this.alt(A||false).ctrl(z||false).shift(x||false)}w.prototype={code:function(x){return this.property("code",x)},alt:function(x){return this.property("alt",x)},ctrl:function(x){return this.property("ctrl",x)},shift:function(x){return this.property("shift",x)},equals:function(x){return this._code==x.code()&&this._alt==x.alt()&&this._ctrl==x.ctrl()&&this._shift==x.shift()},toString:function(){return g.str.parse(this._code)}};g.ext(w,g.Class);g.key=function(y,A,z,x){return new w(y,A,z,x)};g.key.canParse=function(x){return g.isNumber(c(x))};g.key.parse=function(x){try{return new w(c(x),x.altKey,x.ctrlKey,x.shiftKey)}catch(x){throw g.exception("arg")}};g.key.tryParse=function(x){return g.key.canParse(x)?g.key.parse(x):null};function c(x){try{return(g.exists(x.which))?x.which:event.keyCode}catch(x){return null}}function l(D,A){if(isNaN(D)){throw new g.exception("arg",g.str.format("$.money requires a number. Passed {0}",D))}var z=D.toString().split(/\./),B=z[0],C=z[1];function y(x){return(D<0)?-x:x}this._cents=(g.exists(C))?y(parseFloat("."+C)):0;this._dollars=parseInt(B);this._type=A||"$";this._value=D}l.prototype={cents:function(){return this._cents},dollars:function(){return this._dollars},type:function(){return this._type},value:function(){return this._value},add:function(x){money_checkType(this,x);return new l(this._value+x.value())},divide:function(x){if(!g.isNumber(x)){throw new Error()}return new l(this._value/x)},equals:function(x){return(this.isOfType(x))&&(this._value==x.value())},isOfType:function(x){return this._type==x.type()},isGreaterThan:function(x){money_checkType(this,x);return this._value>x.value()},isLessThan:function(x){money_checkType(this,x);return this._value<x.value()},multiply:function(x){if(!g.isNumber(x)){throw new Error()}return new l(this._value*x)},round:function(){return new l(g.math.round(this.value,-2))},roundDown:function(){return new l(g.math.roundDown(this.value,-2))},roundUp:function(){return new l(g.math.roundUp(this.value,-2))},subtract:function(x){money_checkType(this,x);return new l(this._value-x.value())},toString:function(){var x=(this.value<0)?"({0}{1}.{2})":"{0}{1}.{2}";return g.str.format(x,this._type,money_formatDollars(this),money_formatCents(this))}};g.money=function(y,x){return new l(y,x)};g.money.zero=function(){return g.money(0)};g.money.isMoney=function(x){return x instanceof l};g.money.canParse=function(x){try{g.money.parse(x);return true}catch(y){return false}};g.money.parse=function(C){if(g.isNumber(C)){return g.money(C)}var x=/(\(.*\))|(\-)/.test(C),B=(x)?1:0,A=C.match(/[^\d\.\,\-]/g)||[],z=g.exists(A[B])?A[B]:"$",D=parseFloat(C.replace(/[^\d\.]/g,"")),y=(x)?-D:D;return g.money(y,z)};g.money.tryParse=function(x){return g.money.canParse(x)?g.money.parse(x):null};money_checkType=function(y,x){if(!y.isOfType(x)){throw new g.exception("operation","Invalid operation on non-conforming currencies.")}};money_formatDollars=function(x){var y=x.dollars(),A=(x.cents()>=0.995)?(y+1):y,F=A.toString(),C=F.replace(/\-/,"").split(/\B/).reverse(),z=C.length,D=z>3,B=0,E=[];while(B<z){E[E.length]=C[B];B++;if(!g.exists(C[B])){break}if((B%3==0)&&D){E[E.length]=","}}return g.str.build.apply(this,E.reverse())};money_formatCents=function(z){var A=g.math.round(z.cents(),-3),y=A.toString(),B=y.replace(/\-|(0\.)/g,"").concat("0").split(/\B/),x=B.length;if(g.isZero(x)||A>=0.995){return"00"}if(x<2){return"0"+B[0]}return(parseInt(B[2])>4)?B[0]+(parseInt(B[1])+1):B[0]+B[1]};function t(y,x){t.base.call(this);this._topLeft=y;this._bottomRight=x}t.prototype={topLeft:function(){return this.get("topLeft")},bottomRight:function(){return this.get("bottomRight")},contains:function(z){var y=this._topLeft,x=this._bottomRight;return y.isAbove(z)&&y.isLeftOf(z)&&x.isRightOf(z)&&x.isBelow(z)}};g.ext(t,g.Class);g.rectangle=function(y,x){return new t(y,x)};function e(z,A){if(!g.isNumber(z)||!g.isNumber(A)){throw g.exception("args",g.str.format("at $.vector({0},{1})",z,A))}e.base.call(this,z,A);this._lengthSquared=u(this,z,A);this._length=f(this,this._lengthSquared);this._unitNormalX=o(this,z);this._unitNormalY=o(this,A)}e.prototype={magnatude:function(){return this.get("length")},equals:function(x){return(x instanceof e)&&((this._x===x.x())&&(this._y===x.y()))},normal:function(){return g.vector(this._unitNormalX,this._unitNormalY)},invert:function(){return g.vector(this.x()*-1,this.y()*-1)},norm:function(){return g.vector(Math.abs(this.x()),Math.abs(this.y()))},perpendicular:function(){return g.vector(this.y()*-1,this.x())},isZero:function(){return this.x()==0&&this.y()==0},add:function(x){return g.vector(this.x()+x.x(),this.y()+x.y())},dot:function(x){return(this.x()*x.x())+(this.y()*x.y())},perpendicularAtTo:function(x){var y=x.add(this.projectionOfOnto(x).invert());return g.vector(y.x(),y.y())},projectionOfOnto:function(x){var y=x.normal().scale(this.dot(x.normal()));return g.vector(y.x(),y.y())},scale:function(x){return g.vector((this.x()*x),(this.y()*x))},unitNormalDot:function(x){return(this.normal().x()*x.normal().x())+(this.normal().y()*x.normal().y())},reflect:function(x){if(x.isZero()){return this}var y=x.normal();return this.add(y.scale(2*(y.dot(this))).invert())},round:function(x){var y=x||0;return g.vector(g.math.round(this.x(),y),g.math.round(this.y(),y))}};g.ext(e,g.coord.Class);function f(x,y){if(x.isZero()){return 0}return Math.sqrt(y)}function u(A,z,B){if(A.isZero()){return 0}return Math.pow(z,2)+Math.pow(B,2)}function o(y,x){if(y.isZero()){return 0}return x/y.magnatude()}g.vector=function(z,A){return new e(z,A)};g.vector.Class=e;g.vector.zero=function(){return g.vector(0,0)};g.vector.random=function(B,A){var z=B*Math.random(),C=A*Math.random();return g.vector(z,C)}})($);
class GlGenerator{
    constructor(gl,vertex,fragment){
        this.gl = gl;
        this.vertex = vertex;
        this.fragment = fragment;
    }
    init(setting){
        var vertexShader = this.constructor.createShader(this.gl,this.gl.VERTEX_SHADER,this.vertex);
        var fragmentShader = this.constructor.createShader(this.gl,this.gl.FRAGMENT_SHADER,this.fragment);
        var program = this.constructor.createProgram(this.gl,vertexShader,fragmentShader);
        this.gl.useProgram(program);

        //清空画布
        this.gl.clearColor(0,0,0,0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        setting(this.gl,program)
    }
    static createShader(gl,type,source){
        //创建shader
        var shader = gl.createShader(type);
        //添加资源
        gl.shaderSource(shader,source);
        //编译着色器
        gl.compileShader(shader);
        var status = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
        if(status){
            return shader;
        }else{
            console.log(gl.getShaderInfoLog(shader))
        }
    }

    static createProgram(gl,vertexShader,fragmentShader){
        var program = gl.createProgram();
        gl.attachShader(program,vertexShader);
        gl.attachShader(program,fragmentShader);
        gl.linkProgram(program);
        var status = gl.getProgramParameter(program,gl.LINK_STATUS);
        if(status){
            return program
        }else{
            console.log(gl.getProgramInfoLog(program))
        }
    }

    static circlePoints(x,y,r,n,hex=1){
        var points = [];
        if(hex === 1){//颜色随机
            points.push(x,y,Math.random(),Math.random(),Math.random(),Math.random());
        }else{
            points.push(x,y,...this.hexToRgba(hex));
        }
        
        for(var i =0 ;i<= n;i++){
            var arg = i * Math.PI * 2 / n;
            var pointX = r * Math.cos(arg) + x;
            var pointY = r * Math.sin(arg) + y;
            if(hex === 1){//颜色随机
                points.push(pointX,pointY,Math.random(),Math.random(),Math.random(),Math.random())
            }else{
                points.push(pointX,pointY,...this.hexToRgba(hex))
            }
        }

        return points;   
    }
    static hexToRgb(hex){
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return [parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16),1]
    }

    static hexToRgba (hex, opacity=1) {
        console.log(hex)
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        opacity = opacity >= 0 && opacity <= 1 ? Number(opacity) : 1;
        console.log([parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16),opacity])
        return [parseInt(result[1], 16)/255,parseInt(result[2], 16)/255,parseInt(result[3], 16)/255,opacity]
    }
}
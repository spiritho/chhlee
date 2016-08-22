        var animationlist = Array(welcomewordings.length);
        $(function () {
            animationlist = initAnimationlist(animationlist.length);
            playAnimation("canvasWelcome", animationlist);
        });


        function playAnimation(canvasId, displaytxtlist)
        {
            var self=this;
            self.intv = 50;
            self.delay = 2000;
            self.runcount = 0;
            self.maxcount = 200;
            self.textlist = displaytxtlist;
			self.ctrl=document.getElementById(canvasId);

            self.draw = function ()
            {
				if(self.ctrl==null)
					return;
                ctx = self.ctrl.getContext("2d");
                ctx.clearRect(0,0,$(self.ctrl).width(), $(self.ctrl).height());
                var i;
                var bprintText = 0;
                for (i = 0; i < self.textlist.length; i++)
                {
                    if (self.textlist[i].size1 <= self.textlist[i].size2 && self.runcount*self.intv>=i*self.delay)
                    {
                        ctx.font = self.textlist[i].size1 + "px " + self.textlist[i].fontfamily;
                        ctx.strokeStyle = transHextoRgdb(self.textlist[i].color, (100 - Math.min(self.textlist[i].size1, 95)) / 100);
                        if(i%2==0)
                            ctx.strokeText(self.textlist[i].displaytext, 20, (60 + (self.textlist[i].size1) / 2));
                        else
                            ctx.strokeText(self.textlist[i].displaytext, 300-self.textlist[i].size1*2, (60 + (self.textlist[i].size1) / 2));

                        self.textlist[i].size1 += 2;
                        bprintText = 1;
                    }
                }
                self.runcount++;
                if (bprintText == 0 || self.runcount>self.maxcount)
                {
                    clearInterval(self.timer);
                    $("#animationWelcome").hide();
                }
            }
            self.timer=setInterval(self.draw,self.intv);
        }
        function initAnimationlist(num) {
            var i;
            var list = new Array(num)
            for (i = 0; i < animationlist.length; i++) {
                list[i] = initAnimationText(welcomewordings[i], 10, 300, "#1F9F3F", "Microsoft JhengHei");
            }
            return list;
        }
        function initAnimationText(_displaytext, _size1, _size2, _color, _fontfamily) {
            var obj =
                {
                    displaytext: _displaytext,
                    size1: _size1,
                    size2: _size2,
                    color: _color,  //#1F9F3F
                    fontfamily: _fontfamily
                }
            return obj;
        }
        function transHextoRgdb(colorcode,alphavalue)
        {
            var res="rgba(0,0,0,1)"
            if (colorcode.indexOf('#') == 0)
            {
                var r,g,b;
                r=hexToRgb(colorcode).r;
                g=hexToRgb(colorcode).g;
                b=hexToRgb(colorcode).b;
                res="rgba("+r+","+g+","+b+","+alphavalue+")";
            }
            return res;    
        }
const Tweenr 	= require('tweenr')
const tweenr = Tweenr({ defaultEase: 'expoOut' })

export default class Animate {
	constructor(material, animation, duration = 4.0, delay = 1.0) {
		this.duration = duration
		this.delay = delay
		this.animation = animation
		this.material = material
		this._bind('play', 'explode')
		this.enabled = true

	}

	_bind(...methods) {
		methods.forEach((method) => this[method] = this[method].bind(this));
	}

	play() {
		switch(this.animation) {
			case "explode": 
				this.explode(this.duration, this.delay)
				this.animation = "implode"
				break
			case "implode":
				this.implode(this.duration)
				this.animation = "explode"
				break
			default: console.warn("invalid animation parameter")
		}
	}

	stop() {
		this.enabled = false
		this.tween.cancel()
		this.material.uniforms.animate.value = 1.0
	}

	explode(dur, delay = 0){
		this.tween = tweenr.to(this.material.uniforms.animate, {
			duration: dur, 
			value: 0, 
			delay: delay, 
			ease: 'circOut'
		}).on('complete', () => {
			if (this.enabled) this.play()
		})
	}

	implode(material, delay = 0) {
		this.tween = tweenr.to(this.material.uniforms.animate, {
			duration: 2.0, 
			value: 1, 
			delay: delay, 
			ease: 'quadInOut'
		}).on('complete', () => {
			if (this.enabled) this.play()
		})
	}
}
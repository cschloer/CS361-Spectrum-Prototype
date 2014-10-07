
// invisible/blink with normal projectile
var isVisible : boolean;
var clock : float;
var blinkCounter : int;

public class Monster5 extends Monster {
	
	function init(c : Character) {
		//print("Monster 5");
		super.init(c);
		isVisible = true;
		clock = 0.0;
		blinkCounter = 0;
		health = 2;
		model.renderer.material.mainTexture = Resources.Load("Textures/magician", Texture2D);	// Set the texture.  Must be in Resources folder.

	}
	
	function hurt() {
		if (isVisible) {
			super.hurt();
		} 
	}
	
	function blink() {
		if (clock%3 <.1 && clock/3 > blinkCounter ) {
			if (isVisible) {
				vip1Sound.Play();
				isVisible = false;
				blinkCounter++;
				if (model!= null) model.renderer.material.color.a = 0;
			}else{
				vip2Sound.Play();
				isVisible = true;
				blinkCounter++;
				if (model!= null) model.renderer.material.color.a = 1;
			}
	 } 
	}
	
	function Update() {
		super.Update();
		clock = clock + Time.deltaTime;
		blink();
	}

}

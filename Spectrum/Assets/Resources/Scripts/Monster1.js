
// Low-life fleeing guy

public class Monster1 extends Monster {

	function init(c: Character){
		super.init(c);
		model.renderer.material.mainTexture = Resources.Load("Textures/Monster1", Texture2D);	// Set the texture.  Must be in Resources folder.
	}
	
	function Update() {
		if (health == 1) {
			moveFromHero(3);
		}
		else if(health > 0){
			act();
		}else if (health > -100){
			die(1);
			health -= 101;
		}		
	}
}
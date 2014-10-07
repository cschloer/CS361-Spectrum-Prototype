
// Fast attacker

public class Monster3 extends Monster {
	
	function init(c : Character) {
		super.init(c);
		health = 1; 
		model.renderer.material.mainTexture = Resources.Load("Textures/Monster3", Texture2D);	// Set the texture.  Must be in Resources folder.

	}
	
	function act(){
		model.transform.position.z = 0;
		circlingBehaviour(.5);
		if(Random.value > .95 && distanceToHero() < .5){
			simpleMelee();
		}
	}
	
}
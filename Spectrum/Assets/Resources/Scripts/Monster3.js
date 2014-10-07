
// Fast attacker

public class Monster3 extends Monster {

	function act(){
		model.transform.position.z = 0;
		circlingBehaviour(.5);
		if(Random.value > .95){
			simpleMelee();
		}
	}
	
}
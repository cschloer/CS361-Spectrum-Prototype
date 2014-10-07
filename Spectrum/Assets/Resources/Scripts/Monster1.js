
// Low-life fleeing guy

public class Monster1 extends Monster {
	
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
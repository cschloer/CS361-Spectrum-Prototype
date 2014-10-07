#pragma strict

public class Monster6 extends Monster{
	public var lunging : boolean;
	public var lungeTimer : float;
	function init(c : Character){
		super.init(c);
		health = 1;
		moveSpeed = 2;
		lunging = false;
		lungeTimer = 0;
	}
	
	function act(){
		var distance : float = distanceToHero();
		if(heroAngle() > 160 && heroAngle() < 200 && distance < 4.1 && distance > 3.9 && Random.value > .97) lunging = true;
		if(lunging){
			move(2);
			lungeTimer += Time.deltaTime;
		} else { 
			circleBehind();
		}
		if((distance < 1 && lunging) || lungeTimer > 2){
			simpleMelee();
			lunging = false;
			lungeTimer = 0;
		}
	}
			
		
				 
		
	function circleBehind(){	
		if(heroAngle() < 180) moveRight();
		if(heroAngle() >= 180) moveLeft();
		turnToHero(1.5);
		if(distanceToHero() > 4){
			move();
		} else {
			moveBack(.5);
		}
	}
}
var gemType : int;
var clock : float;

function Start () {
	clock = 0.0;
}

function Update () {
	clock = clock + Time.deltaTime;		// Update the clock based on how much time has elapsed since the previous update.
	if (gemType == 1) { // set rotation around z for spin effect
		transform.eulerAngles = Vector3(0.0,0.0,360.0*clock);
	}
	if (gemType == 2) { // set position y for bounce effect
		transform.localPosition = Vector3(0,0.2*Mathf.Sin(5*clock),0);	
	}	
	if (gemType == 3) { // set scale in x and y for pulse effect
		transform.localScale = Vector3(1+0.5*Mathf.Sin(3*clock),1+0.5*Mathf.Sin(3*clock),1);
	}
	if (gemType == 4) { // set color for twinkle effect
		renderer.material.color = Color(1+0.5*Mathf.Sin(8*clock),1+0.5*Mathf.Sin(8*clock),1+0.5*Mathf.Sin(8*clock));
	}
}
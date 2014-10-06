var color:int;
var character:CharacterModel;

function init(color:int, c) { // 0 for blue, 1 for red, 2 for yellow
	enabled = false;
	//model = modelObject.AddComponent("CharacterModel");						// Add a gemModel script to control visuals of the gem.
	//gemType = 1;

//	modelObject.transform.parent = this.transform;

	//this.name = "Color Circle";		
	
	if (color == 0){
			this.name = "Blue";											// Name the object.
			this.renderer.material.mainTexture = Resources.Load("Textures/bluecircle", Texture2D);	// Set the texture.  Must be in Resources folder.
			this.transform.position = Vector3(3, 3, 1);	
	}
	else if (color == 1){
		this.name = "Red";											// Name the object.
		this.renderer.material.mainTexture = Resources.Load("Textures/redcircle", Texture2D);	// Set the texture.  Must be in Resources folder.
		this.transform.position = Vector3(0, 3, 1);	
	
	}
	else if (color == 2){
		this.name = "Yellow";											// Name the object.
		this.renderer.material.mainTexture = Resources.Load("Textures/yellowcircle", Texture2D);	// Set the texture.  Must be in Resources folder.
		this.transform.position = Vector3(-3, 3, 1);	
	
	}
	this.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	this.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
	/*model.name = "ColorCircle Model";											// Name the object.
	model.renderer.material.mainTexture = Resources.Load("Textures/train1", Texture2D);	// Set the texture.  Must be in Resources folder.
	model.renderer.material.color = Color(1,1,1);												// Set the color (easy way to tint things).
	model.renderer.material.shader = Shader.Find ("Transparent/Diffuse");						// Tell the renderer that our textures have transparency. 
*/	enabled = true;
	this.color = color;
	this.character = c;
}

function Update(){



}

function OnTriggerEnter(col:Collider){
	if(col.gameObject.name.Contains("Character")){
		switch(color){
			case 0:
				character.changeBlue();
				break;
			case 1:
				character.changeRed();
				break;
			case 2:
				character.changeYellow();
				break;
		}
	}
	/*if (col.gameObject.name.Contains("Blue")){
		if (blue) blue = false;
		else blue = true;
		print("Blue: " + blue);
	}
	if (col.gameObject.name.Contains("Red")){
		if (red){
			red = false;
			this.transform.localScale = Vector3(1,1,1); 
			modelObject.GetComponent(BoxCollider).size = Vector3(.25,.5,10);
		}
		else {
			red = true;
			this.transform.localScale = Vector3(2,2,2); 
			modelObject.GetComponent(BoxCollider).size = Vector3(.5,1,10);
		}
		print("Red: " + red);
	}
	if (col.gameObject.name.Contains("Yellow")){
		if (yellow) yellow = false;
		else yellow = true;
		print("Yellow: " + yellow);
	}*/
}


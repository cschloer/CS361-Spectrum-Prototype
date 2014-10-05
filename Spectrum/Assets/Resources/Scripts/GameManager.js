var characterFolder : GameObject;	// This will be an empty game object used for organizing objects in the hierarchy pane.
var character : Character;			// This array will hold the character objects that are created.
var colorFolder : GameObject;
var monsterFolder : Array;
var camera:GameObject;

// Called once when the script is created.
function Start () {
	characterFolder = new GameObject();  
	characterFolder.name = "Character";
	colorFolder = new GameObject();
	colorFolder.name = "Color Circles";
	monsterFolder = new Array();
//	monsterFolder.name = "Monsters";
	addCharacter(0,0);
	addCircle(0); // blue circle
	addCircle(1); // red circle
	addCircle(2); // yellow circle
	addMonster(4, 3, character);

}

// Called every frame.
function Update () {
}

function addCharacter(x : float , y : float) {
	var characterObject = new GameObject();					// Create a new empty game object that will hold a character.
	var characterScript = characterObject.AddComponent("Character");		// Add the character.js script to the object.
														// We can now refer to the object via this script.
	characterScript.transform.parent = characterFolder.transform;	// Set the character's parent object to be the character folder.
	characterScript.transform.position = Vector3(x,y,0);		// Position the character at x,y.								
	
	characterScript.init(this);							// Initialize the character script.
	
	character = characterScript;							// Add the character to the characters array for future access.
	characterScript.name = "CharacterScript";				// Give the character object a name in the Hierarchy pane.				

	
}

function addCircle(color:int){
	//var colorObject = new GameObject();					// Create a new empty game object that will hold a color.
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
	var colorScript = modelObject.AddComponent("ColorCircle");		// Add the color.js script to the object.
	
												
	/*modelObject.collider.enabled = false;
	modelObject.AddComponent(BoxCollider);
	modelObject.GetComponent(BoxCollider).isTrigger = true;
	modelObject.GetComponent(BoxCollider).size = Vector3(.5,.5,.5);
	modelObject.AddComponent(Rigidbody);
	modelObject.GetComponent(Rigidbody).isKinematic = true;
	modelObject.GetComponent(Rigidbody).useGravity = false;
	modelObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
*/
																																													// We can now refer to the object via this script.
	colorScript.transform.parent = colorFolder.transform;	// Set the color's parent object to be the color folder.							
	colorScript.init(color);							// Initialize the color script.
	

}


function addMonster(x : float, y :float, c : Character){
	var monsterObject = new GameObject();					// Create a new empty game object that will hold a character.
	var monsterScript = monsterObject.AddComponent("Monster");		// Add the character.js script to the object.
	monsterScript.transform.position = Vector3(x,y,0);		// Position the character at x,y.								
	
	monsterScript.init(c);
	monsterFolder.Add(monsterScript);
	monsterScript.name = "Monster";
}

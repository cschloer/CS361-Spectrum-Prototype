var characterFolder : GameObject;	// This will be an empty game object used for organizing objects in the hierarchy pane.
var character : Character;			// This array will hold the character objects that are created.
var monsterFolder : Array;


// Called once when the script is created.
function Start () {
	characterFolder = new GameObject();  
	characterFolder.name = "Character";
	monsterFolder = new Array();
//	monsterFolder.name = "Monsters";
	addCharacter(0,0);
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
	
	characterScript.init();							// Initialize the character script.
	
	character = characterScript;							// Add the character to the characters array for future access.
	characterScript.name = "CharacterScript";				// Give the character object a name in the Hierarchy pane.				

	
}
function addMonster(x : float, y :float, c : Character){
	var monsterObject = new GameObject();					// Create a new empty game object that will hold a character.
	var monsterScript = monsterObject.AddComponent("Monster");		// Add the character.js script to the object.
	monsterScript.transform.position = Vector3(x,y,0);		// Position the character at x,y.								
	
	monsterScript.init(c);
	monsterFolder.Add(monsterScript);
	monsterScript.name = "Monster";
}

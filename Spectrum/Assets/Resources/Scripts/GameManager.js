var characterFolder : GameObject;	// This will be an empty game object used for organizing heroes in the hierarchy pane.
var monsterFolder : GameObject;		// This will be an empty game object used for organizing monsters in the hierarchy pane.
var tileFolder : GameObject;		// This will be an empty game object used for organizing tiles in the hierarchy pane.
var character : Character;			// This is the hero character.
var monsters : Array;				// This array holds monsters.
var tiles : Array;					// This array holds tiles.


// Called once when the script is created.
function Start () {
	characterFolder = new GameObject();  
	characterFolder.name = "Character";
	monsterFolder = new GameObject();
	monsterFolder.name = "Monsters";
	monsters = new Array();
	tiles = new Array();

	addCharacter(0,0);
	addMonster(4, 3, character);
	
	//protolevelInit();
	
}

// Called every frame.
function Update () {

}


// Adds: These functions add certain elements.
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
	
	monsterScript.transform.parent = monsterFolder.transform;
	monsterScript.transform.position = Vector3(x,y,0);		// Position the character at x,y.								
	
	monsterScript.init(c);
	monsters.Add(monsterScript);
	monsterScript.name = "Monster"+ monsters.length;
}

function addTile(x : float, y :float, t : String){
	var tileObject = new GameObject();						// Create a new empty game object that will hold a character.
	var tileScript = tileObject.AddComponent("Tile");		// Add the character.js script to the object.
	tileScript.transform.position = Vector3(x,y,0);		// Position the character at x,y.								
	
	tileScript.init(t);
	tileFolder.Add(tileScript);
	tileScript.name = "Tile" + tiles.length;
}

// ProtolevelInit
// Initiates the prototype level.
function protolevelInit(){
  
  
  
}
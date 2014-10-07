var characterFolder : GameObject;	// This will be an empty game object used for organizing heroes in the hierarchy pane.
var monsterFolder : GameObject;		// This will be an empty game object used for organizing monsters in the hierarchy pane.
var tileFolder : GameObject;		// This will be an empty game object used for organizing tiles in the hierarchy pane.
var character : Character;			// This is the hero character.
var monsters : Array;				// This array holds monsters.
var tiles : Array;					// This array holds tiles.

var colorFolder : GameObject;
var camera:GameObject;

// Called once when the script is created.
function Start () {
	characterFolder = new GameObject();  
	characterFolder.name = "Character";
	monsterFolder = new GameObject();
	monsterFolder.name = "Monsters";
	monsters = new Array();
	tileFolder = new GameObject();
	tileFolder.name = "Tiles";
	tiles = new Array();

	colorFolder = new GameObject();
	colorFolder.name = "Color Circles";
	
	addCharacter(0,0);
	addCircle(0); // blue circle
	addCircle(1); // red circle
	addCircle(2); // yellow circle
	addMonster3(4, 3, character);
	
	addWeapon(character);
	
	protolevelInit();


	
}

// Called every frame.
function Update () {
}


// Adds: These functions add certain elements.
function addCharacter(x : float , y : float) {
	var characterObject = new GameObject();									// Create a new empty game object that will hold a character.
	var characterScript = characterObject.AddComponent("Character");		// Add the character.js script to the object.
																			// We can now refer to the object via this script.
	characterScript.transform.parent = characterFolder.transform;			// Set the character's parent object to be the character folder.
	characterScript.transform.position = Vector3(x,y,0);					// Position the character at x,y.								
	
	characterScript.init(this);												// Initialize the character script.
	
	character = characterScript;											// Add the character to the characters array for future access.
	characterScript.name = "CharacterScript";								// Give the character object a name in the Hierarchy pane.				

	
}


function addCircle(color:int){
	//var colorObject = new GameObject();					// Create a new empty game object that will hold a color.
	var modelObject = GameObject.CreatePrimitive(PrimitiveType.Quad);	// Create a quad object for holding the gem texture.
	var colorScript = modelObject.AddComponent("ColorCircle");		// Add the color.js script to the object.
												
	modelObject.collider.enabled = false;
	modelObject.AddComponent(BoxCollider);
	modelObject.GetComponent(BoxCollider).isTrigger = true;
	modelObject.GetComponent(BoxCollider).size = Vector3(.5,.5,.5);
	/*modelObject.AddComponent(Rigidbody);
	modelObject.GetComponent(Rigidbody).isKinematic = true;
	modelObject.GetComponent(Rigidbody).useGravity = false;
	modelObject.GetComponent(Rigidbody).inertiaTensor = Vector3(1, 1, 1);
*/
																																													// We can now refer to the object via this script.
	colorScript.transform.parent = colorFolder.transform;	// Set the color's parent object to be the color folder.							
	colorScript.init(color, character.model);							// Initialize the color script.
	

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

function addMonster1(x : float, y :float, c : Character){
	var monsterObject = new GameObject();					// Create a new empty game object that will hold a character.
	var monsterScript = monsterObject.AddComponent("Monster1");		// Add the character.js script to the object.
	
	monsterScript.transform.parent = monsterFolder.transform;
	monsterScript.transform.position = Vector3(x,y,0);		// Position the character at x,y.								
	
	monsterScript.init(c);
	monsters.Add(monsterScript);
	monsterScript.name = "Monster"+ monsters.length;
}

function addMonster3(x : float, y :float, c : Character){
	var monsterObject = new GameObject();					// Create a new empty game object that will hold a character.
	var monsterScript = monsterObject.AddComponent("Monster3");		// Add the character.js script to the object.
	
	monsterScript.transform.parent = monsterFolder.transform;
	monsterScript.transform.position = Vector3(x,y,0);		// Position the character at x,y.								
	
	monsterScript.init(c);
	monsters.Add(monsterScript);
	monsterScript.name = "Monster"+ monsters.length;
}

function addWeapon(c : Character){
	var weaponObject = new GameObject();
	var weaponScript = weaponObject.AddComponent("Weapon");
	
	weaponScript.transform.position = character.transform.position;
	
	weaponScript.init(c);
}

function addTile(x : float, y :float, t : String){
	var tileObject = new GameObject();						// Create a new empty game object that will hold a character.
	var tileScript = tileObject.AddComponent("Tile");		// Add the character.js script to the object.
	
	tileScript.transform.parent = tileFolder.transform;
	tileScript.transform.position = Vector3(x,y,1);			// Position the character at x,y.								
	
	tileScript.init(t);
	tiles.Add(tileScript);
	tileScript.name = "Tile" + tiles.length;
}

// ProtolevelInit
// Initiates the prototype level.
function protolevelInit(){
  for( i = -10; i <=10; i++) {
    for( j = -10; j <=10; j++){
      if( i == -10 || i == 10 || j == -10 || j == 10){
      	addTile(i,j,"Wall");
      }
      else{
      	addTile(i,j,"Floor");
      }
    }
  }
}

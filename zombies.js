/**
 * Class => Item(name)
 * -----------------------------
 * Creates an item.
 *
 * @name Item
 * @param {string} name     The item's name.
 * @property {string} name
 */

// SUPER CLASS
function Item(name) {
  this.name = name;
}


/**
 * Class => Weapon(name, damage)
 * -----------------------------
 * Creates a weapon item.
 * Weapon items can be equipped for use in battle.
 *
 * The Weapon class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Weapon
 * @param {string} name     The weapon's name.
 * @param {number} damage   The weapon's damage.
 * @property {number} damage
 */

// SUB CLASS
function Weapon(name, damage) {
  this.damage = damage;
  Item.call(this, name); // Call super class
}


/**
 * Weapon Extends Item Class
 * -----------------------------
 */

// EXTEND SUPER CLASS
Weapon.prototype = Object.create(Item.prototype, {
  constructor : {
    value : Item
  }
});

/**
 * Class => Food(name, energy)
 * -----------------------------
 * Creates a food item.
 * Food items give energy, restoring health to the player.
 *
 * The Food class constructor will call
 *   the super class (Item) constructor
 *   while passing in the 1 Item constructor param
 *
 * @name Food
 * @param {string} name       The food's name.
 * @param {number} energy     The energy the food provides.
 * @property {number} energy
 */

function Food(name, energy) {
  this.energy = energy;
  Item.call(this, name); // Call super class
}


/**
 * Food Extends Item Class
 * -----------------------------
 */
Food.prototype = Object.create(Item.prototype, {
  constructor : {
    value : Item
  }
});



/**
 * Class => Player(name, health, strength, speed)
 * -----------------------------
 * Creates a player in a zombie-infested world.
 *
 * @name Player
 * @param {string} name                    The player's name.
 * @param {number} health                  The player's health.
 * @param {number} strength                The player's strength.
 * @param {number} speed                   The player's speed.
 * @private {array} pack                   Default value should be empty.
 * @private {number} maxHealth             Default value should be set to `health`.
 * @property {string} name
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive             Default value should be `true`.
 * @property {Weapon/boolean} equipped     Default value should be `false`.
 * @property {method} getPack              Returns private variable `pack`.
 * @property {method} getMaxHealth         Returns private variable `maxHealth`.
 */
function Player(name, health, strength, speed) {
  this.name = name;
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this._pack = [];
  this._maxHealth = health;
  this.equipped = false;
  this.isAlive = true;
  this.getPack = function() {
    return this._pack;
  };
  this.getMaxHealth = function() {
    return this._maxHealth;
  };
}


/**
 * Player Class Method => checkPack()
 * -----------------------------
 * Player checks the contents of their pack.
 *
 * Nicely format and print the items in the player's pack.
 * To access the pack, be sure to use Player's getPack method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name checkPack
 */
Player.prototype.checkPack = function() {
  var stuff = '';
  for (var i = 0; i < this.getPack().length; i++) {
    if (i < this.getPack().length - 1) {
      stuff += (this.getPack()[i].name + ' ');
    } else { stuff += this.getPack()[i].name;}
  }
  console.log(stuff);
};

/**
 * Player Class Method => takeItem(item)
 * -----------------------------
 * Player takes an item from the world and places it into their pack.
 *
 * Player's pack can only hold a maximum of 3 items, so if they try to add more
 *   than that to the pack, return false.
 * Before returning true or false, print a message containing the player's
 *   name and item's name if successful.  Otherwise, print a message saying
 *   that the pack is full so the item could not be stored.
 * Note: The player is allowed to store similar items (items with the same name).
 * You should be able to invoke this function on a Player instance.
 *
 * @name takeItem
 * @param {Item/Weapon/Food} item   The item to take.
 * @return {boolean} true/false     Whether player was able to store item in pack.
 */
Player.prototype.takeItem = function(item) {
  if (this.getPack().length < 3) {
    this.getPack().push(item);
    console.log('Successfully obtained ' + item.name);
    return true;
  } else if (this.getPack().length > 3) {
    console.log('You\'re carrying too much shit already. Don\'t be a hoarder.');
    return false;
  } else {
    return false;
  }
};

/**
 * Player Class Method => discardItem(item)
 * -----------------------------
 * Player discards an item from their pack.
 *
 * Use Array's indexOf method to check if the pack contains the item.
 * If an item is not found in the pack, indexOf returns -1.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
 *
 * If the item is in the pack, remove it from the pack using Array's splice method.
 * Print the player and item names and a message saying the item was discarded.
 * Return true for the successful discard.
 * Note: The splice method can also be used for array element replacement.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * If the item is not in the pack, return a message with the item name saying
 *   nothing was discarded since the item could not be found.
 * Return false in this case.
 *
 * You should be able to invoke this function on a Player instance.
 *
 * @name discardItem
 * @param {Item/Weapon/Food} item   The item to discard.
 * @return {boolean} true/false     Whether player was able to remove item from pack.
 */

Player.prototype.discardItem = function(item) {
  if (this.getPack().indexOf(item) !== -1) {
    var space = this.getPack().indexOf(item);
    console.log('You tossed yo ' + item.name + '! Hope you don\'t need it later.');
    this.getPack().splice(space, 1);
    return true;
  } else {
    console.log('You don\'t even own a ' + item.name + '! Makes it kind of difficult to thow one away');
    return false;
  }
};

/**
 * Player Class Method => equip(itemToEquip)
 * -----------------------------
 * Player equips a weapon item.
 *
 * Player can only equip Weapon instances.
 * Player can only equip weapon items from their pack.
 *
 * If the player already has a weapon equipped (the equipped property
 *   is set to an Item), find the itemToEquip in the pack and replace
 *   it with the currently equipped item.  Then set the equipped property
 *   to the itemToEquip.
 * However, if the player doesn't already have a weapon equipped, simply
 *   equip that item and remove it from the pack.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equip
 * @param {Weapon} itemToEquip  The weapon item to equip.
 */
Player.prototype.equip = function(itemToEquip) {
  if (this.getPack().indexOf(itemToEquip) == -1) {
    console.log('You equipped ' + itemToEquip.name + '!...but after you stopped hallucinating you notice you don\'t even own a ' + itemToEquip.name + '.');
    return false;
  }else if (!(itemToEquip instanceof Weapon)) {
    console.log('You equipped ' + itemToEquip.name + '..... then realised it wouldn\'t be an effective weapon and put it back.');
    return false;
  } else if (itemToEquip instanceof Weapon) {
    var space = this.getPack().indexOf(itemToEquip);
    if (this.equipped === false) {
      this.equipped = itemToEquip;
    } else {
      this.getPack().push(this.equipped);
      this.equipped = itemToEquip;
    }
    this.getPack().splice(space, 1);
    return true;
  }
};


/**
 * Player Class Method => eat(itemToEat)
 * -----------------------------
 * Player eats a food item, restoring their health.
 *
 * Player can only eat Food instances.
 * Player can only eat food items from their pack.
 *
 * Remove itemToEat from the pack.
 * Increase the player's health by the food's energy amount, but do not
 *   exceed the player's max health.  If exceeded, simply set player's health
 *   to max health instead.
 * To access the player's max health, be sure to use Player's getMaxHealth method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name eat
 * @param {Food} itemToEat  The food item to eat.
 */
Player.prototype.eat = function(itemToEat) {
  if (this.getPack().indexOf(itemToEat) == -1) {
    console.log('You wished you could eat ' + itemToEat.name + ' and you totally could, had you owned any.');
    return false;
  }else if (!(itemToEat instanceof Food)) {
    console.log('You attempt to eat your ' + itemToEat.name + '. You stop trying, but only after losing a couple teeth. It wasn\'t a very good dietary choice anyway.');
    return false;
  } else if (itemToEat instanceof Food) {
    var space = this.getPack().indexOf(itemToEat);
    if (this.health + itemToEat.energy > this.getMaxHealth()) {
      this.health = this._maxHealth;
      console.log('You eat your ' + itemToEat.name + '. It was delicious and now you feel fat. Perhaps you should ration your food better... or not, you might be dead soon anyways.');
    } else {
      this.health += itemToEat.energy;
      console.log('Om nom nom nom nom, your ' + itemToEat.name + ' never stood a chance. You wonder if this is how the zombies will feel when they\'re munching on your face.');
    }
    this.getPack().splice(space, 1);
    return true;
  }
};

/**
 * Player Class Method => useItem(item)
 * -----------------------------
 * Player uses an item from the pack.
 *
 * If the item is a weapon, the player should equip the item.
 * If the item is food, the player should eat the item.
 * You should be able to invoke this function on a Player instance.
 *
 * @name useItem
 * @param {Item/Weapon/Food} item   The item to use.
 */
Player.prototype.useItem = function(item) {
  if (this.getPack().indexOf(item) == -1) {
    console.log('If you had a ' + item.name + ' it would probably be really useful right about now. Unfortunately you don\'t own one.');
  } else {
    var space = this.getPack().indexOf(item);
    if (item instanceof Food) {
      if (this.health + item.energy > this.getMaxHealth()) {
        this.health = this._maxHealth;
        console.log('You eat your ' + item.name + '. It was delicious and now you feel fat. Perhaps you should ration your food better... or not, you might be dead soon anyways.');
      } else {
        this.health += item.energy;
        console.log('Om nom nom nom nom, your ' + item.name + ' never stood a chance. You wonder if this is how the zombies will feel when they\'re munching on your face.');
      }
      this.getPack().splice(space, 1);
      return true;
    } else if (item instanceof Weapon) {
      if (this.equipped === false) {
        this.equipped = item;
      } else {
        this.getPack().push(this.equipped);
        this.equipped = item;
      }
      this.getPack().splice(space, 1);
      return true;
    } else {
      console.log('You stare blankly at your ' + item + ' unsure of what to do with it. You could ask somebody, but they might just kill you and steal it.');
    }
  }
};

/**
 * Player Class Method => equippedWith()
 * -----------------------------
 * Player checks their equipment.
 *
 * Prints the player's name and equipped weapon's name.
 * If nothing is equipped, prints a message saying so.
 * Also returns the equipped weapon's name or false if nothing is equipped.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equippedWith
 * @return {string/boolean}   Weapon name or false if nothing is equipped.
 */
Player.prototype.equippedWith = function() {
  if (this.equipped === false) {
    console.log('You are currently unarmed. Well I mean you have arms for now but it won\'t stay that way for long if you meet a zombie. Might want to consider finding a weapon.');
    return false;
  } else {
    console.log('It\'s difficult to look feirce weilding a ' + this.equipped.name + ' but somehow you pull it off. Well at least you\'d like to think so, really you just loook like an idiot. At least the zombies don\'t care.');
    return this.equipped.name;
  }
};

/**
 * Class => Zombie(health, strength, speed)
 * -----------------------------
 * Creates a normal zombie.
 *
 * @name Zombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 * @private {number} maxHealth      Default value should be set to `health`.
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive      Default value should be `true`.
 */
function Zombie(health, strength, speed) {
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this._maxHealth = health;
  this.isAlive = true;
}

/**
 * Class => FastZombie(health, strength, speed)
 * -----------------------------
 * Creates a fast zombie.
 *
 * The FastZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name FastZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function FastZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}

/**
 * FastZombie Extends Zombie Class
 * -----------------------------
 */
FastZombie.prototype = Object.create(Zombie.prototype, {
  constructor : {
    value : Zombie
  }
});


/**
 * Class => StrongZombie(health, strength, speed)
 * -----------------------------
 * Creates a strong zombie.
 *
 * The StrongZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name StrongZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function StrongZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}

/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */
StrongZombie.prototype = Object.create(Zombie.prototype, {
  constructor : {
    value : Zombie
  }
});


/**
 * Class => RangedZombie(health, strength, speed)
 * -----------------------------
 * Creates a ranged zombie.
 *
 * The RangedZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name RangedZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function RangedZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}

/**
 * StrongZombie Extends Zombie Class
 * -----------------------------
 */
RangedZombie.prototype = Object.create(Zombie.prototype, {
  constructor : {
    value : Zombie
  }
});


/**
 * Class => ExplodingZombie(health, strength, speed)
 * -----------------------------
 * Creates an exploding zombie.
 *
 * The ExplodingZombie class constructor will call
 *   the super class (Zombie) constructor
 *   while passing in the 3 Zombie constructor params
 *
 * @name ExplodingZombie
 * @param {number} health           The zombie's health.
 * @param {number} strength         The zombie's strength.
 * @param {number} speed            The zombie's speed.
 */
function ExplodingZombie(health, strength, speed) {
  Zombie.call(this, health, strength, speed);
}

/**
 * ExplodingZombie Extends Zombie Class
 * -----------------------------
 */
ExplodingZombie.prototype = Object.create(Zombie.prototype, {
  constructor : {
    value : Zombie
  }
});



/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  // var player = new Player("Joan", 500, 30, 70);
  // var zombie = new Zombie(40, 50, 20);
  // var charger = new FastZombie(175, 25, 60);
  // var tank = new StrongZombie(250, 100, 15);
  // var spitter = new RangedZombie(150, 20, 20);
  // var boomer = new ExplodingZombie(50, 15, 10);

  // var shovel = new Weapon("shovel", 15);
  // var sandwich = new Food("sandwich", 30);
  // var chainsaw = new Weapon("chainsaw", 25);

  // player.takeItem(shovel);
  // player.takeItem(sandwich);
  // player.takeItem(chainsaw);
  // player.discardItem(new Weapon("scythe", 21));
  // player.discardItem(shovel);
  // player.checkPack();
  // player.takeItem(shovel);
  // player.checkPack();

  // player.equippedWith();
  // player.useItem(chainsaw);
  // player.equippedWith();
  // player.checkPack();

  // player.useItem(shovel);
  // player.equippedWith();
  // player.checkPack();

  // player.health = 487;
  // console.log("Before health: " + player.health);
  // player.useItem(sandwich);
  // console.log("After health: " + player.health);
  // player.checkPack();
}

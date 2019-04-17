################################################################################
## FoodItem class TEMPORARILY stores data of food items from
## Open Food Facts API. Data is taken after barcode is scanned,
## and the stored data is used for nutritional calculations
## and is deleted once the relevant data for each item is
## stored in the firebase database
################################################################################

class FoodItem:
    #################################################
    ## expiration date = est. # days till expiration
    ## quantity = for dup. items
    def __init__(self, name, expiration_date = 7, quantity = 1):
        self.name = name
        self.expiration_date = expiration_date
        self.quantity = quantity
    
    #################################################
    ## low, moderate, or high
    def set_nutrient_levels(self, salt, sugars, saturated_fat, fat):
        self.nutrients = salt
    
    #################################################
    ## Various vitamin / ingredient levels formatted
    ## in various ways
    def add_nutriments(self, nutriments):
        self.nutriments = nutriments
    
    #################################################
    ## Tags like breakfast, plant-based, etc.
    def add_categories(self, categories):
        self.categories = categories
    
    #################################################
    ## Must be parsed: ex. "Ingredients: Milled corn,
    ## sugar, cocoa processed with alkali, palm kernel
    ## oil, malt flavor, contains 2% or less of salt
    ## semisweet chocolate (sugar, chocolate, dextrose),
    ## natural flavor Vitamins and Minerals: Iron
    ## (ferric phosphate), vitamin C (ascorbic acid),
    ## niacinamide, vitamin B6 (pyridoxine hydrochloride)."
    def add_ingredients(self, ingredients_text):
        self.ingredients = ingredients_text
    
    #################################################
    ## List of relevant allergens (incomplete)
    def add_allergies(self, allergies):
        self.allergies = allergies;
    
    #################################################
    ## Front image for food
    def add_image(self, url):
        self.image = url
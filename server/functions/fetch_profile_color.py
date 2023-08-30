COLOURS = [
        "#1abc9c", 
        "#2980b9", 
        "#d35400", 
        "#8e44ad", 
        "#34495e", 
        "#f39c12",
        "#1abc9c",
        "#fbc531",
        "#273c75",
        "#9980FA",
        "#833471",
        "#ED4C67",
        "#12CBC4",
        "#A3CB38",
        "#60a3bc",
        "#FC427B",
        "#CAD3C8",
        "#FEA47F"
]

def profile_color(name):
    name_hash = hash(name)
    idx = name_hash % len(COLOURS)
    return COLOURS[idx]

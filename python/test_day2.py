from day2 import count_cubes

def test_count_a_game_with_one_bag():
    assert count_cubes('Game 1: 3 blue, 4 red, 7 green') == (1, 4, 7, 3)

def test_count_a_game_with_more_bags():
    assert count_cubes('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green') == (5, 6, 3, 2)

def test_count_a_high_game_with_more_bags():
    assert count_cubes('Game 100: 6 green, 15 red, 12 blue; 9 red; 16 red; 17 red, 3 blue, 7 green') == (100, 17, 7, 12)

def test_count_from_given_examples():
    assert count_cubes('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green') == (1, 4, 2, 6)
    assert count_cubes('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue') == (2, 1, 3, 4)
    assert count_cubes('Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red') == (3, 20, 13, 6)
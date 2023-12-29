import re
import sys

def count_cubes(line):
    game_and_bags = line.split(':')
    game_number = int(game_and_bags[0].split()[1])

    cubes = re.split(',|;', game_and_bags[1])

    red = 0
    blue = 0
    green = 0

    for cube in cubes:
        count, color = cube.lstrip().split()
        if color == 'red':
            red = max(int(count), red)
        if color == 'blue':
            blue = max(int(count), blue)
        if color == 'green':
            green = max(int(count),green)


    return (game_number, red, green, blue)


def solution1():
    _sum = 0
    with open('day2.txt') as fp:
        for line in fp:
             game_number, red, green, blue = count_cubes(line)

             if red <= 12 and green <= 13 and blue <= 14:
                 _sum += game_number

    print(_sum)

def solution2():
    _sum = 0
    with open('day2.txt') as fp:
        for line in fp:
            _, red, green, blue = count_cubes(line)

            _sum += red * green * blue

    print(_sum)


if __name__ == "__main__":
    args = sys.argv
    # args[0] = current file
    # args[1] = function name
    globals()[args[1]]()
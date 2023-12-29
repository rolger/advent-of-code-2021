import sys

def compute_calibration(line, with_nums= False):
    numbers = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9'
    }

    first = ''
    last = ''
    for i in range(len(line)):
        if line[i].isnumeric():
            last = line[i]
        elif with_nums:
            for num,value in numbers.items():
                if line[i:i+len(num)] == num:
                    last = value

        if first == '':
            first = last

    return int(first + last)

def solution1():
    _sum = 0
    with open('day1.txt') as fp:
        for line in fp:
            _sum += compute_calibration(line)

    print(_sum)

def solution2():
    _sum = 0
    with open('day1.txt') as fp:
        for line in fp:
            _sum += compute_calibration(line, True)

    print(_sum)

if __name__ == "__main__":
    args = sys.argv
    # args[0] = current file
    # args[1] = function name
    globals()[args[1]]()
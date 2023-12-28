from day1 import compute_calibration

def test_a_line_with_more_numbers():
    assert compute_calibration('a1b2c3d4e5f') == 15

def test_a_line_with_one_numbers():
    assert compute_calibration('treb7uchet') == 77

def test_a_line_with_two_numbers():
    assert compute_calibration('pqr3stu8vwx') == 38

def test_a_line_with_one_til_nine():
    assert compute_calibration('pqr3stuonevwx',True) == 31
    assert compute_calibration('pqrtwo3stuonevwx',True) == 21
    assert compute_calibration('pqrthreestu5vwx',True) == 35
    assert compute_calibration('pqr6stuonevwfourx',True) == 64
    assert compute_calibration('pqrfivestuonevwfourx',True) == 54
    assert compute_calibration('pqrsix',True) == 66
    assert compute_calibration('pqreightfaf',True) == 88
    assert compute_calibration('pqrsevenop8nineii',True) == 79
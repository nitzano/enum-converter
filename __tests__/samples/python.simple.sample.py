''' Test file for python enum parser '''
from enum import Enum, auto, IntEnum


class Colors(Enum):
    Green = 1
    Yellow = 2
    Blue = 5


class Pets(Enum):
    Dog = 1
    Cat = 2
    Mouse = 4

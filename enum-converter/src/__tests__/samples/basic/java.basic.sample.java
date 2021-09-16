package test.enums;

public enum Colors {
  Green(1),
  Yellow(2),
  Blue(5);

  public int value;
  
  public Colors(int value) {
    this.value = value;
  }
}

private enum Pets {
  Dog(1),
  Cat(2),
  Mouse(4);

  public int value;

  public Pets(int value) {
    this.value = value;
  }
};

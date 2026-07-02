public static boolean method1(String name) {
      if (name == null) {
          return false;
      }
      if (name.startsWith(".")) {
          return false;
      }
      if ((name.length() < 1) || (name.length() > MAX_NAME_LENGTH)) {
          return false;
      }
      for (int i = 0; i < name.length(); i++) {
          char c = name.charAt(i);
          if (!Character.isLetterOrDigit(c) && !VALID_NAME_SET.contains(c)) {
              return false;
          }
      }
      return true;
  }

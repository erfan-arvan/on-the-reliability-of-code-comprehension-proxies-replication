	/**
	 * Tests whether the given string is a valid project name.
	 * Rules:
	 * <ul>
	 * <li>Name may not start with period</li>
	 * <li>All characters must be a letter, digit (0..9), period, hyphen, underscore or space</li>
	 * <li>May not exceed a length of 60 characters</li>
	 * </ul>
	 * @param name name to validate
	 * @return true if specified name is valid, else false
	 */
	public static boolean isValidProjectName(String name) {
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





	/**
	 * Returns true if the given URI represents a remote resource
	 * 
	 * @param uri the URI
	 * @return true if the given URI represents a remote resource
	 */
	public static boolean isRemote(URI uri) {

		if (isFilesystemPath(uri)) {
			return false;
		}

		String scheme = uri.getScheme();
		if (scheme == null) {
			return false;
		}

		switch (scheme) {
			case "file":
				return false;
			case "jar":
				return false;
			default:
				break;
		}
		return true;
	}




		/**
	 * Checks to see if the given machine type is defined in this file.
	 * 
	 * @param type The machine type to check.
	 * @return True if the given machine type is defined in this file; otherwise, false.
	 */
	public static boolean isMachineTypeDefined(short type) {
		if (type == IMAGE_FILE_MACHINE_UNKNOWN) {
			// This machine type is only defined in this file for completeness.
			// We want to treat this type as an unsupported machine.
			return false;
		}

		for (Field field : CoffMachineType.class.getDeclaredFields()) {
			if (!field.isSynthetic()) {
				int modifiers = field.getModifiers();
				if (Modifier.isFinal(modifiers) && Modifier.isStatic(modifiers)) {
					try {
						if (field.getShort(null) == type) {
							return true;
						}
					}
					catch (IllegalAccessException e) {
						continue;
					}
				}
			}
		}
		return false;
	}




    /**
     * <p>Case in-sensitive find of the first index within a CharSequence
     * from the specified position.</p>
     *
     * <p>A {@code null} CharSequence will return {@code -1}.
     * A negative start position is treated as zero.
     * An empty ("") search CharSequence always matches.
     * A start position greater than the string length only matches
     * an empty search CharSequence.</p>
     *
     * <pre>
     * AsciiString.indexOfIgnoreCase(null, *, *)          = -1
     * AsciiString.indexOfIgnoreCase(*, null, *)          = -1
     * AsciiString.indexOfIgnoreCase("", "", 0)           = 0
     * AsciiString.indexOfIgnoreCase("aabaabaa", "A", 0)  = 0
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", 0)  = 2
     * AsciiString.indexOfIgnoreCase("aabaabaa", "AB", 0) = 1
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", 3)  = 5
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", 9)  = -1
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", -1) = 2
     * AsciiString.indexOfIgnoreCase("aabaabaa", "", 2)   = 2
     * AsciiString.indexOfIgnoreCase("abc", "", 9)        = -1
     * </pre>
     *
     * @param str  the CharSequence to check, may be null
     * @param searchStr  the CharSequence to find, may be null
     * @param startPos  the start position, negative treated as zero
     * @return the first index of the search CharSequence (always &ge; startPos),
     *  -1 if no match or {@code null} string input
     */
    public static int indexOfIgnoreCase(final CharSequence str, final CharSequence searchStr, int startPos) {
        if (str == null || searchStr == null) {
            return INDEX_NOT_FOUND;
        }
        if (startPos < 0) {
            startPos = 0;
        }
        int searchStrLen = searchStr.length();
        final int endLimit = str.length() - searchStrLen + 1;
        if (startPos > endLimit) {
            return INDEX_NOT_FOUND;
        }
        if (searchStrLen == 0) {
            return startPos;
        }
        for (int i = startPos; i < endLimit; i++) {
            if (regionMatches(str, true, i, searchStr, 0, searchStrLen)) {
                return i;
            }
        }
        return INDEX_NOT_FOUND;
    }




    /**
     * <p>Case in-sensitive find of the first index within a CharSequence
     * from the specified position. This method optimized and works correctly for ASCII CharSequences only</p>
     *
     * <p>A {@code null} CharSequence will return {@code -1}.
     * A negative start position is treated as zero.
     * An empty ("") search CharSequence always matches.
     * A start position greater than the string length only matches
     * an empty search CharSequence.</p>
     *
     * <pre>
     * AsciiString.indexOfIgnoreCase(null, *, *)          = -1
     * AsciiString.indexOfIgnoreCase(*, null, *)          = -1
     * AsciiString.indexOfIgnoreCase("", "", 0)           = 0
     * AsciiString.indexOfIgnoreCase("aabaabaa", "A", 0)  = 0
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", 0)  = 2
     * AsciiString.indexOfIgnoreCase("aabaabaa", "AB", 0) = 1
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", 3)  = 5
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", 9)  = -1
     * AsciiString.indexOfIgnoreCase("aabaabaa", "B", -1) = 2
     * AsciiString.indexOfIgnoreCase("aabaabaa", "", 2)   = 2
     * AsciiString.indexOfIgnoreCase("abc", "", 9)        = -1
     * </pre>
     *
     * @param str  the CharSequence to check, may be null
     * @param searchStr  the CharSequence to find, may be null
     * @param startPos  the start position, negative treated as zero
     * @return the first index of the search CharSequence (always &ge; startPos),
     *  -1 if no match or {@code null} string input
     */
    public static int indexOfIgnoreCaseAscii(final CharSequence str, final CharSequence searchStr, int startPos) {
        if (str == null || searchStr == null) {
            return INDEX_NOT_FOUND;
        }
        if (startPos < 0) {
            startPos = 0;
        }
        int searchStrLen = searchStr.length();
        final int endLimit = str.length() - searchStrLen + 1;
        if (startPos > endLimit) {
            return INDEX_NOT_FOUND;
        }
        if (searchStrLen == 0) {
            return startPos;
        }
        for (int i = startPos; i < endLimit; i++) {
            if (regionMatchesAscii(str, true, i, searchStr, 0, searchStrLen)) {
                return i;
            }
        }
        return INDEX_NOT_FOUND;
    }


	/**
	 * Delete the supplied {@link Path} &mdash; for directories,
	 * recursively delete any nested directories or files as well.
	 * @param root the root {@code Path} to delete
	 * @return {@code true} if the {@code Path} existed and was deleted,
	 * or {@code false} if it did not exist
	 * @throws IOException in the case of I/O errors
	 * @since 5.0
	 */
	public static boolean deleteRecursively(@Nullable Path root) throws IOException {
		if (root == null) {
			return false;
		}
		if (!Files.exists(root)) {
			return false;
		}

		Files.walkFileTree(root, new SimpleFileVisitor<>() {
			@Override
			public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
				Files.delete(file);
				return FileVisitResult.CONTINUE;
			}

			@Override
			public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
				Files.delete(dir);
				return FileVisitResult.CONTINUE;
			}
		});
		return true;
	}





	  /**
   * Indicates whether the contents of the given character sequences {@code s1} and {@code s2} are
   * equal, ignoring the case of any ASCII alphabetic characters between {@code 'a'} and {@code 'z'}
   * or {@code 'A'} and {@code 'Z'} inclusive.
   *
   * <p>This method is significantly faster than {@link String#equalsIgnoreCase} and should be used
   * in preference if at least one of the parameters is known to contain only ASCII characters.
   *
   * <p>Note however that this method does not always behave identically to expressions such as:
   *
   * <ul>
   *   <li>{@code string.toUpperCase().equals("UPPER CASE ASCII")}
   *   <li>{@code string.toLowerCase().equals("lower case ascii")}
   * </ul>
   *
   * <p>due to case-folding of some non-ASCII characters (which does not occur in {@link
   * String#equalsIgnoreCase}). However in almost all cases that ASCII strings are used, the author
   * probably wanted the behavior provided by this method rather than the subtle and sometimes
   * surprising behavior of {@code toUpperCase()} and {@code toLowerCase()}.
   *
   * @since 16.0
   */
  public static boolean equalsIgnoreCase(CharSequence s1, CharSequence s2) {
    // Calling length() is the null pointer check (so do it before we can exit early).
    int length = s1.length();
    if (s1 == s2) {
      return true;
    }
    if (length != s2.length()) {
      return false;
    }
    for (int i = 0; i < length; i++) {
      char c1 = s1.charAt(i);
      char c2 = s2.charAt(i);
      if (c1 == c2) {
        continue;
      }
      int alphaIndex = getAlphaIndex(c1);
      // This was also benchmarked using '&' to avoid branching (but always evaluate the rhs),
      // however this showed no obvious improvement.
      if (alphaIndex < 26 && alphaIndex == getAlphaIndex(c2)) {
        continue;
      }
      return false;
    }
    return true;
  }




    /**
   * Returns the number of bytes in the UTF-8-encoded form of {@code sequence}. For a string, this
   * method is equivalent to {@code string.getBytes(UTF_8).length}, but is more efficient in both
   * time and space.
   *
   * @throws IllegalArgumentException if {@code sequence} contains ill-formed UTF-16 (unpaired
   *     surrogates)
   */
  public static int encodedLength(CharSequence sequence) {
    // Warning to maintainers: this implementation is highly optimized.
    int utf16Length = sequence.length();
    int utf8Length = utf16Length;
    int i = 0;

    // This loop optimizes for pure ASCII.
    while (i < utf16Length && sequence.charAt(i) < 0x80) {
      i++;
    }

    // This loop optimizes for chars less than 0x800.
    for (; i < utf16Length; i++) {
      char c = sequence.charAt(i);
      if (c < 0x800) {
        utf8Length += ((0x7f - c) >>> 31); // branch free!
      } else {
        utf8Length += encodedLengthGeneral(sequence, i);
        break;
      }
    }

    if (utf8Length < utf16Length) {
      // Necessary and sufficient condition for overflow because of maximum 3x expansion
      throw new IllegalArgumentException(
          "UTF-8 length does not fit in int: " + (utf8Length + (1L << 32)));
    }
    return utf8Length;
  }




  	/** Returns the lowest positive root of the quadric equation given by a * x * x + b * x + c = 0. If no solution is given,
	 * Float.NaN is returned.
	 * @param a the first coefficient of the quadric equation
	 * @param b the second coefficient of the quadric equation
	 * @param c the third coefficient of the quadric equation
	 * @return the lowest positive root or Float.Nan */
	static public float lowestPositiveRoot (float a, float b, float c) {
		float det = b * b - 4 * a * c;
		if (det < 0) return Float.NaN;

		float sqrtD = (float)Math.sqrt(det);
		float invA = 1 / (2 * a);
		float r1 = (-b - sqrtD) * invA;
		float r2 = (-b + sqrtD) * invA;

		if (r1 > r2) {
			float tmp = r2;
			r2 = r1;
			r1 = tmp;
		}

		if (r1 > 0) return r1;
		if (r2 > 0) return r2;
		return Float.NaN;
	}



	/** Close approximation of the frequently-used trigonometric method atan2. Average error is 1.057E-6 radians; maximum error is
	 * 1.922E-6. Takes y and x (in that unusual order) as floats, and returns the angle from the origin to that point in radians.
	 * It is about 4 times faster than {@link Math#atan2(double, double)} (roughly 15 ns instead of roughly 60 ns for Math, on Java
	 * 8 HotSpot). <br>
	 * Credit for this goes to the 1955 research study "Approximations for Digital Computers," by RAND Corporation. This is sheet
	 * 11's algorithm, which is the fourth-fastest and fourth-least precise. The algorithms on sheets 8-10 are faster, but only by
	 * a very small degree, and are considerably less precise. That study provides an {@link #atan(float)} method, and that cleanly
	 * translates to atan2().
	 * @param y y-component of the point to find the angle towards; note the parameter order is unusual by convention
	 * @param x x-component of the point to find the angle towards; note the parameter order is unusual by convention
	 * @return the angle to the given point, in radians as a float; ranges from {@code -PI} to {@code PI} */
	public static float atan2 (final float y, float x) {
		float n = y / x;
		if (n != n)
			n = (y == x ? 1f : -1f); // if both y and x are infinite, n would be NaN
		else if (n - n != n - n) x = 0f; // if n is infinite, y is infinitely larger than x.
		if (x > 0)
			return atanUnchecked(n);
		else if (x < 0) {
			if (y >= 0) return atanUnchecked(n) + PI;
			return atanUnchecked(n) - PI;
		} else if (y > 0)
			return x + HALF_PI;
		else if (y < 0) return x - HALF_PI;
		return x + y; // returns 0 for 0,0 or NaN if either y or x is NaN
	}








# Validator Utility Documentation

## Overview

The validator utility (`utils/validators.ts`) provides input validation functions for the album-viewer application. This utility contains functions to validate and parse different types of user input, ensuring data integrity and security throughout the application.

## Purpose

The validator utility serves several critical purposes:

- **Data Integrity**: Ensures that user inputs conform to expected formats before processing
- **Security**: Prevents malformed data from causing application errors or security vulnerabilities
- **Type Safety**: Provides TypeScript-compatible validation with proper return types
- **Internationalization**: Supports French date format validation for localized applications

## Available Functions

### 1. `validateDate(dateString: string): Date | null`

Validates and converts a French-formatted date string to a JavaScript Date object.

#### Parameters
- `dateString` (string): A date string in French format (DD/MM/YYYY)

#### Returns
- `Date`: A valid JavaScript Date object if the input is valid
- `null`: If the input string doesn't match the French date format or is invalid

#### Format Requirements
- Must follow the pattern: `DD/MM/YYYY`
- Day: Two digits (01-31)
- Month: Two digits (01-12)
- Year: Four digits
- Separators: Forward slashes (/)

#### Usage Examples

```typescript
import { validateDate } from './utils/validators';

// Valid examples
const newYear = validateDate('01/01/2024');        // Returns Date object for January 1, 2024
const christmas = validateDate('25/12/2023');      // Returns Date object for December 25, 2023
const leapDay = validateDate('29/02/2024');        // Returns Date object for February 29, 2024

// Invalid examples
const invalidFormat1 = validateDate('2024-01-01'); // Returns null (wrong format)
const invalidFormat2 = validateDate('1/1/2024');   // Returns null (missing leading zeros)
const invalidFormat3 = validateDate('31-12-2024'); // Returns null (wrong separators)
const invalidDate = validateDate('32/13/2024');    // Returns null (invalid date values)
```

#### Important Notes
- The function uses zero-based months internally (JavaScript Date convention)
- Input validation is strict - leading zeros are required
- No additional date validation is performed (e.g., February 31st would create an invalid Date object)
- Time zone considerations are not handled; dates are created in local time

### 2. `validateIPV6(ipv6String: string): boolean`

Validates IPv6 address strings according to standard IPv6 format specifications.

#### Parameters
- `ipv6String` (string): An IPv6 address string to validate

#### Returns
- `boolean`: `true` if the input is a valid IPv6 address, `false` otherwise

#### Supported Formats
The function supports the following IPv6 address formats:

1. **Full Form**: Eight groups of four hexadecimal digits
   - Example: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`

2. **Compressed Form**: Using `::` to represent consecutive groups of zeros
   - Example: `2001:db8:85a3::8a2e:370:7334`

3. **Leading Zero Compression**: Omitting leading zeros in groups
   - Example: `2001:db8:85a3:0:0:8a2e:370:7334`

#### Usage Examples

```typescript
import { validateIPV6 } from './utils/validators';

// Valid IPv6 addresses
const fullForm = validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334');     // true
const compressed = validateIPV6('2001:db8:85a3::8a2e:370:7334');              // true
const loopback = validateIPV6('::1');                                         // true
const allZeros = validateIPV6('::');                                          // true

// Invalid IPv6 addresses
const ipv4 = validateIPV6('192.168.1.1');                                     // false
const malformed = validateIPV6('2001:0db8:85a3::8a2e::7334');                 // false (double ::)
const tooLong = validateIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334:extra'); // false
const invalidChars = validateIPV6('2001:0db8:85a3:000g:0000:8a2e:0370:7334'); // false
```

#### Important Notes
- The regex pattern supports standard IPv6 formats but may not catch all edge cases
- Does not validate IPv6 scope identifiers or zone IDs
- Does not perform network reachability validation
- Case-insensitive validation (accepts both uppercase and lowercase hex digits)

## Error Handling

Both validation functions are designed to fail gracefully:

- **`validateDate`**: Returns `null` for any invalid input, allowing for safe null checks
- **`validateIPV6`**: Returns `false` for any invalid input, providing clear boolean logic

## Security Considerations

When using these validators in your application:

1. **Always validate on both client and server side** - Client-side validation is for user experience; server-side validation is for security
2. **Sanitize inputs** - These validators check format but don't sanitize potentially malicious content
3. **Use in conjunction with other validation** - Consider additional business logic validation where appropriate
4. **Handle edge cases** - Test with boundary values and malicious inputs

## Integration with Application

These validators are designed to be used throughout the album-viewer application where user input validation is required. Common use cases include:

- Form validation in Pug templates
- API input validation in Express routes
- Data processing in middleware
- Database input sanitization

## Dependencies

The validator utility has no external dependencies and uses only standard JavaScript/TypeScript features:

- Regular expressions for pattern matching
- Standard Date constructor
- Built-in parseInt function

## Performance Considerations

- Both functions are lightweight with minimal computational overhead
- Regular expression compilation is optimized by the JavaScript engine
- Consider caching validation results for frequently validated inputs
- No memory leaks or resource cleanup required

## Future Enhancements

Potential improvements for the validator utility:

1. **Enhanced Date Validation**: Add business logic validation (e.g., future dates, age limits)
2. **Multiple Date Formats**: Support for additional international date formats
3. **IPv4 Validation**: Add support for IPv4 address validation
4. **Email Validation**: Add comprehensive email address validation
5. **Custom Validation Rules**: Framework for adding custom validation logic
6. **Async Validation**: Support for database or API-based validation

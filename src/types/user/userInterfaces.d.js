/**
 * @typedef {Object} UserName
 * @property {string} title - The user's title (for example, "Miss", "Mr")
 * @property {string} first - The user's name
 * @property {string} last - Last name of the user
 */

/**
 * @typedef {Object} Street
 * @property {number} number - Street number
 * @property {string} name - Street name
 */

/**
 * @typedef {Object} Coordinates
 * @property {string} latitude - Latitude
 * @property {string} longitude - Longitude
 */

/**
 * @typedef {Object} Timezone
 * @property {string} offset - Offset from UTC
 * @property {string} description - Description of the time zone
 */

/**
 * @typedef {Object} Location
 * @property {Street} street - Information about the street
 * @property {string} city - City
 * @property {string} state - State or region
 * @property {string} country - Country
 * @property {number|string} barcode - Postal code
 * @property {Coordinates} coordinates - Coordinates of the location
 * @property {Timezone} timezone - Time zone
 */

/**
 * @typedef {Object} LoginInfo
 * @property {string} uuid is a unique user identifier
 * @property {string} username - The user's name
 * @property {string} password - Password
 * @property {string} salt - Salt for hashing the password
 * @property {string} md5 - MD5 hash of the password
 * @property {string} sha1 - Hash of the SHA1 password
 * @property {string} sha256 - The SHA256 hash of the password
 */

/**
 * @typedef {Object} DateOfBirth
 * @property {string} date - Date of birth
 * @property {number} age - Age
 */

/**
 * @typedef {Object} Registration
 * @property {string} date - Date of registration
 * @property {number} age - How many years have passed since registration
 */

/**
 * @typedef {Object} IdInfo
 * @property {string} name - The name of the identifier
 * @property {string|null} value - The value of the identifier (can be `null')
 */

/**
 * @typedef {Object} UserPicture
 * @property {string} large - URL of the user's large image
 * @property {string} medium - The URL of the average user image
 * @property {string} thumbnail - URL of the thumbnail of the user's image
 */

/**
 * @typedef {Object} User
 * @property {string} gender - The gender of the user
 * @property {UserName} name - The user's name
 * @property {Location} location - The user's location
 * @property {string} email - The user's email address
 * @property {LoginInfo} login - Information about the user's login
 * @property {DateOfBirth} dob - Date of birth of the user
 * @property {Registration} registered - User registration data
 * @property {string} phone - The user's phone number
 * @property {string} cell - The user's mobile phone
 * @property {IdInfo} id - Information about the ID
 * @property {UserPicture} picture - User's images
 * @property {string} nat - The user's nationality
 */

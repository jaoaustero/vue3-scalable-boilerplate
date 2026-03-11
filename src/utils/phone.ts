/**
 * Phone Utility
 *
 * Utility functions for phone number formatting, country code lookup,
 * and dial code resolution.
 */

export interface PhoneCountry {
	/** Country display name */
	label: string;
	/** ISO 3166-1 alpha-2 country code (lowercase) */
	value: string;
	/** International dialing code (without leading +) */
	dialCode: string;
	/** Priority for disambiguation when multiple countries share a dial code */
	priority: number;
	/** Area codes used to distinguish shared dial codes (e.g. US/Canada both +1) */
	areaCodes: string[] | null;
}

export interface FormattedPhone {
	/** Subscriber portion of the phone number (after dial code) */
	phoneNumber: string;
	/** ISO country code */
	countryCode: string;
	/** Dial code without + prefix */
	dialCode: string;
}

const PHONE_CODE: PhoneCountry[] = [
	{ label: 'Afghanistan', value: 'af', dialCode: '93', priority: 0, areaCodes: null },
	{ label: 'Albania', value: 'al', dialCode: '355', priority: 0, areaCodes: null },
	{ label: 'Algeria', value: 'dz', dialCode: '213', priority: 0, areaCodes: null },
	{ label: 'American Samoa', value: 'as', dialCode: '1', priority: 5, areaCodes: ['684'] },
	{ label: 'Andorra', value: 'ad', dialCode: '376', priority: 0, areaCodes: null },
	{ label: 'Angola', value: 'ao', dialCode: '244', priority: 0, areaCodes: null },
	{ label: 'Anguilla', value: 'ai', dialCode: '1', priority: 6, areaCodes: ['264'] },
	{ label: 'Antigua And Barbuda', value: 'ag', dialCode: '1', priority: 7, areaCodes: ['268'] },
	{ label: 'Argentina', value: 'ar', dialCode: '54', priority: 0, areaCodes: null },
	{ label: 'Armenia', value: 'am', dialCode: '374', priority: 0, areaCodes: null },
	{ label: 'Aruba', value: 'aw', dialCode: '297', priority: 0, areaCodes: null },
	{ label: 'Aruba', value: 'ac', dialCode: '247', priority: 0, areaCodes: null },
	{ label: 'Australia', value: 'au', dialCode: '61', priority: 0, areaCodes: null },
	{ label: 'Austria', value: 'at', dialCode: '43', priority: 0, areaCodes: null },
	{ label: 'Azerbaijan', value: 'az', dialCode: '994', priority: 0, areaCodes: null },
	{ label: 'Bahamas', value: 'bs', dialCode: '1', priority: 8, areaCodes: ['242'] },
	{ label: 'Bahrain', value: 'bh', dialCode: '973', priority: 0, areaCodes: null },
	{ label: 'Bangladesh', value: 'bd', dialCode: '880', priority: 0, areaCodes: null },
	{ label: 'Barbados', value: 'bb', dialCode: '1', priority: 9, areaCodes: ['246'] },
	{ label: 'Belarus', value: 'by', dialCode: '375', priority: 0, areaCodes: null },
	{ label: 'Belgium', value: 'be', dialCode: '32', priority: 0, areaCodes: null },
	{ label: 'Belize', value: 'bz', dialCode: '501', priority: 0, areaCodes: null },
	{ label: 'Benin', value: 'bj', dialCode: '229', priority: 0, areaCodes: null },
	{ label: 'Bermuda', value: 'bm', dialCode: '1', priority: 10, areaCodes: ['441'] },
	{ label: 'Bhutan', value: 'bt', dialCode: '975', priority: 0, areaCodes: null },
	{ label: 'Bolivia, Plurinational State Of', value: 'bo', dialCode: '591', priority: 0, areaCodes: null },
	{ label: 'Bosnia And Herzegovina', value: 'ba', dialCode: '387', priority: 0, areaCodes: null },
	{ label: 'Botswana', value: 'bw', dialCode: '267', priority: 0, areaCodes: null },
	{ label: 'Brazil', value: 'br', dialCode: '55', priority: 0, areaCodes: null },
	{ label: 'British Indian Ocean Territory', value: 'io', dialCode: '246', priority: 0, areaCodes: null },
	{ label: 'Virgin Islands, British', value: 'vg', dialCode: '1', priority: 11, areaCodes: ['284'] },
	{ label: 'Brunei Darussalam', value: 'bn', dialCode: '673', priority: 0, areaCodes: null },
	{ label: 'Bulgaria', value: 'bg', dialCode: '359', priority: 0, areaCodes: null },
	{ label: 'Burkina Faso', value: 'bf', dialCode: '226', priority: 0, areaCodes: null },
	{ label: 'Burundi', value: 'bi', dialCode: '257', priority: 0, areaCodes: null },
	{ label: 'Cambodia', value: 'kh', dialCode: '855', priority: 0, areaCodes: null },
	{ label: 'Cameroon', value: 'cm', dialCode: '237', priority: 0, areaCodes: null },
	{ label: 'Canada', value: 'ca', dialCode: '1', priority: 1, areaCodes: ['204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416', '418', '431', '437', '438', '450', '506', '514', '519', '548', '579', '581', '587', '604', '613', '639', '647', '672', '705', '709', '742', '778', '780', '782', '807', '819', '825', '867', '873', '902', '905'] },
	{ label: 'Cape Verde', value: 'cv', dialCode: '238', priority: 0, areaCodes: null },
	{ label: 'Bonaire, Sint Eustatius And Saba', value: 'bq', dialCode: '599', priority: 1, areaCodes: ['3', '4', '7'] },
	{ label: 'Cayman Islands', value: 'ky', dialCode: '1', priority: 12, areaCodes: ['345'] },
	{ label: 'Central African Republic', value: 'cf', dialCode: '236', priority: 0, areaCodes: null },
	{ label: 'Chad', value: 'td', dialCode: '235', priority: 0, areaCodes: null },
	{ label: 'Chile', value: 'cl', dialCode: '56', priority: 0, areaCodes: null },
	{ label: 'China', value: 'cn', dialCode: '86', priority: 0, areaCodes: null },
	{ label: 'Christmas Island', value: 'cx', dialCode: '61', priority: 2, areaCodes: ['89164'] },
	{ label: 'Cocos (Keeling) Islands', value: 'cc', dialCode: '61', priority: 1, areaCodes: ['89162'] },
	{ label: 'Colombia', value: 'co', dialCode: '57', priority: 0, areaCodes: null },
	{ label: 'Comoros', value: 'km', dialCode: '269', priority: 0, areaCodes: null },
	{ label: 'Congo, The Democratic Republic Of The', value: 'cd', dialCode: '243', priority: 0, areaCodes: null },
	{ label: 'Congo', value: 'cg', dialCode: '242', priority: 0, areaCodes: null },
	{ label: 'Cook Islands', value: 'ck', dialCode: '682', priority: 0, areaCodes: null },
	{ label: 'Costa Rica', value: 'cr', dialCode: '506', priority: 0, areaCodes: null },
	{ label: "CôTe D'Ivoire", value: 'ci', dialCode: '225', priority: 0, areaCodes: null },
	{ label: 'Croatia', value: 'hr', dialCode: '385', priority: 0, areaCodes: null },
	{ label: 'Cuba', value: 'cu', dialCode: '53', priority: 0, areaCodes: null },
	{ label: 'CuraçAo', value: 'cw', dialCode: '599', priority: 0, areaCodes: null },
	{ label: 'Cyprus', value: 'cy', dialCode: '357', priority: 0, areaCodes: null },
	{ label: 'Czech Republic', value: 'cz', dialCode: '420', priority: 0, areaCodes: null },
	{ label: 'Denmark', value: 'dk', dialCode: '45', priority: 0, areaCodes: null },
	{ label: 'Djibouti', value: 'dj', dialCode: '253', priority: 0, areaCodes: null },
	{ label: 'Dominica', value: 'dm', dialCode: '1', priority: 13, areaCodes: ['767'] },
	{ label: 'Dominican Republic', value: 'do', dialCode: '1', priority: 2, areaCodes: ['809', '829', '849'] },
	{ label: 'Ecuador', value: 'ec', dialCode: '593', priority: 0, areaCodes: null },
	{ label: 'Egypt', value: 'eg', dialCode: '20', priority: 0, areaCodes: null },
	{ label: 'El Salvador', value: 'sv', dialCode: '503', priority: 0, areaCodes: null },
	{ label: 'Equatorial Guinea', value: 'gq', dialCode: '240', priority: 0, areaCodes: null },
	{ label: 'Eritrea', value: 'er', dialCode: '291', priority: 0, areaCodes: null },
	{ label: 'Estonia', value: 'ee', dialCode: '372', priority: 0, areaCodes: null },
	{ label: 'Swaziland', value: 'sz', dialCode: '268', priority: 0, areaCodes: null },
	{ label: 'Ethiopia', value: 'et', dialCode: '251', priority: 0, areaCodes: null },
	{ label: 'Falkland Islands (Malvinas)', value: 'fk', dialCode: '500', priority: 0, areaCodes: null },
	{ label: 'Faroe Islands', value: 'fo', dialCode: '298', priority: 0, areaCodes: null },
	{ label: 'Fiji', value: 'fj', dialCode: '679', priority: 0, areaCodes: null },
	{ label: 'Finland', value: 'fi', dialCode: '358', priority: 0, areaCodes: null },
	{ label: 'France', value: 'fr', dialCode: '33', priority: 0, areaCodes: null },
	{ label: 'French Guiana', value: 'gf', dialCode: '594', priority: 0, areaCodes: null },
	{ label: 'French Polynesia', value: 'pf', dialCode: '689', priority: 0, areaCodes: null },
	{ label: 'Gabon', value: 'ga', dialCode: '241', priority: 0, areaCodes: null },
	{ label: 'Gambia', value: 'gm', dialCode: '220', priority: 0, areaCodes: null },
	{ label: 'Georgia', value: 'ge', dialCode: '995', priority: 0, areaCodes: null },
	{ label: 'Germany', value: 'de', dialCode: '49', priority: 0, areaCodes: null },
	{ label: 'Ghana', value: 'gh', dialCode: '233', priority: 0, areaCodes: null },
	{ label: 'Gibraltar', value: 'gi', dialCode: '350', priority: 0, areaCodes: null },
	{ label: 'Greece', value: 'gr', dialCode: '30', priority: 0, areaCodes: null },
	{ label: 'Greenland', value: 'gl', dialCode: '299', priority: 0, areaCodes: null },
	{ label: 'Grenada', value: 'gd', dialCode: '1', priority: 14, areaCodes: ['473'] },
	{ label: 'Guadeloupe', value: 'gp', dialCode: '590', priority: 0, areaCodes: null },
	{ label: 'Guam', value: 'gu', dialCode: '1', priority: 15, areaCodes: ['671'] },
	{ label: 'Guatemala', value: 'gt', dialCode: '502', priority: 0, areaCodes: null },
	{ label: 'Guernsey', value: 'gg', dialCode: '44', priority: 1, areaCodes: ['1481', '7781', '7839', '7911'] },
	{ label: 'Guinea', value: 'gn', dialCode: '224', priority: 0, areaCodes: null },
	{ label: 'Guinea-Bissau', value: 'gw', dialCode: '245', priority: 0, areaCodes: null },
	{ label: 'Guyana', value: 'gy', dialCode: '592', priority: 0, areaCodes: null },
	{ label: 'Haiti', value: 'ht', dialCode: '509', priority: 0, areaCodes: null },
	{ label: 'Honduras', value: 'hn', dialCode: '504', priority: 0, areaCodes: null },
	{ label: 'Hong Kong', value: 'hk', dialCode: '852', priority: 0, areaCodes: null },
	{ label: 'Hungary', value: 'hu', dialCode: '36', priority: 0, areaCodes: null },
	{ label: 'Iceland', value: 'is', dialCode: '354', priority: 0, areaCodes: null },
	{ label: 'India', value: 'in', dialCode: '91', priority: 0, areaCodes: null },
	{ label: 'Indonesia', value: 'id', dialCode: '62', priority: 0, areaCodes: null },
	{ label: 'Iran, Islamic Republic Of', value: 'ir', dialCode: '98', priority: 0, areaCodes: null },
	{ label: 'Iraq', value: 'iq', dialCode: '964', priority: 0, areaCodes: null },
	{ label: 'Ireland', value: 'ie', dialCode: '353', priority: 0, areaCodes: null },
	{ label: 'Isle Of Man', value: 'im', dialCode: '44', priority: 2, areaCodes: ['1624', '74576', '7524', '7924', '7624'] },
	{ label: 'Israel', value: 'il', dialCode: '972', priority: 0, areaCodes: null },
	{ label: 'Italy', value: 'it', dialCode: '39', priority: 0, areaCodes: null },
	{ label: 'Jamaica', value: 'jm', dialCode: '1', priority: 4, areaCodes: ['876', '658'] },
	{ label: 'Japan', value: 'jp', dialCode: '81', priority: 0, areaCodes: null },
	{ label: 'Jersey', value: 'je', dialCode: '44', priority: 3, areaCodes: ['1534', '7509', '7700', '7797', '7829', '7937'] },
	{ label: 'Jordan', value: 'jo', dialCode: '962', priority: 0, areaCodes: null },
	{ label: 'Kazakhstan', value: 'kz', dialCode: '7', priority: 1, areaCodes: ['33', '7'] },
	{ label: 'Kenya', value: 'ke', dialCode: '254', priority: 0, areaCodes: null },
	{ label: 'Kiribati', value: 'ki', dialCode: '686', priority: 0, areaCodes: null },
	{ label: 'Kiribati', value: 'xk', dialCode: '383', priority: 0, areaCodes: null },
	{ label: 'Kuwait', value: 'kw', dialCode: '965', priority: 0, areaCodes: null },
	{ label: 'Kyrgyzstan', value: 'kg', dialCode: '996', priority: 0, areaCodes: null },
	{ label: "Lao People'S Democratic Republic", value: 'la', dialCode: '856', priority: 0, areaCodes: null },
	{ label: 'Latvia', value: 'lv', dialCode: '371', priority: 0, areaCodes: null },
	{ label: 'Lebanon', value: 'lb', dialCode: '961', priority: 0, areaCodes: null },
	{ label: 'Lesotho', value: 'ls', dialCode: '266', priority: 0, areaCodes: null },
	{ label: 'Liberia', value: 'lr', dialCode: '231', priority: 0, areaCodes: null },
	{ label: 'Libya', value: 'ly', dialCode: '218', priority: 0, areaCodes: null },
	{ label: 'Liechtenstein', value: 'li', dialCode: '423', priority: 0, areaCodes: null },
	{ label: 'Lithuania', value: 'lt', dialCode: '370', priority: 0, areaCodes: null },
	{ label: 'Luxembourg', value: 'lu', dialCode: '352', priority: 0, areaCodes: null },
	{ label: 'Macao', value: 'mo', dialCode: '853', priority: 0, areaCodes: null },
	{ label: 'Macedonia, The Former Yugoslav Republic Of', value: 'mk', dialCode: '389', priority: 0, areaCodes: null },
	{ label: 'Madagascar', value: 'mg', dialCode: '261', priority: 0, areaCodes: null },
	{ label: 'Malawi', value: 'mw', dialCode: '265', priority: 0, areaCodes: null },
	{ label: 'Malaysia', value: 'my', dialCode: '60', priority: 0, areaCodes: null },
	{ label: 'Maldives', value: 'mv', dialCode: '960', priority: 0, areaCodes: null },
	{ label: 'Mali', value: 'ml', dialCode: '223', priority: 0, areaCodes: null },
	{ label: 'Malta', value: 'mt', dialCode: '356', priority: 0, areaCodes: null },
	{ label: 'Marshall Islands', value: 'mh', dialCode: '692', priority: 0, areaCodes: null },
	{ label: 'Martinique', value: 'mq', dialCode: '596', priority: 0, areaCodes: null },
	{ label: 'Mauritania', value: 'mr', dialCode: '222', priority: 0, areaCodes: null },
	{ label: 'Mauritius', value: 'mu', dialCode: '230', priority: 0, areaCodes: null },
	{ label: 'Mayotte', value: 'yt', dialCode: '262', priority: 1, areaCodes: ['269', '639'] },
	{ label: 'Mexico', value: 'mx', dialCode: '52', priority: 0, areaCodes: null },
	{ label: 'Micronesia, Federated States Of', value: 'fm', dialCode: '691', priority: 0, areaCodes: null },
	{ label: 'Moldova, Republic Of', value: 'md', dialCode: '373', priority: 0, areaCodes: null },
	{ label: 'Monaco', value: 'mc', dialCode: '377', priority: 0, areaCodes: null },
	{ label: 'Mongolia', value: 'mn', dialCode: '976', priority: 0, areaCodes: null },
	{ label: 'Montenegro', value: 'me', dialCode: '382', priority: 0, areaCodes: null },
	{ label: 'Montserrat', value: 'ms', dialCode: '1', priority: 16, areaCodes: ['664'] },
	{ label: 'Morocco', value: 'ma', dialCode: '212', priority: 0, areaCodes: null },
	{ label: 'Mozambique', value: 'mz', dialCode: '258', priority: 0, areaCodes: null },
	{ label: 'Myanmar', value: 'mm', dialCode: '95', priority: 0, areaCodes: null },
	{ label: 'Namibia', value: 'na', dialCode: '264', priority: 0, areaCodes: null },
	{ label: 'Nauru', value: 'nr', dialCode: '674', priority: 0, areaCodes: null },
	{ label: 'Nepal', value: 'np', dialCode: '977', priority: 0, areaCodes: null },
	{ label: 'Netherlands', value: 'nl', dialCode: '31', priority: 0, areaCodes: null },
	{ label: 'New Caledonia', value: 'nc', dialCode: '687', priority: 0, areaCodes: null },
	{ label: 'New Zealand', value: 'nz', dialCode: '64', priority: 0, areaCodes: null },
	{ label: 'Nicaragua', value: 'ni', dialCode: '505', priority: 0, areaCodes: null },
	{ label: 'Niger', value: 'ne', dialCode: '227', priority: 0, areaCodes: null },
	{ label: 'Nigeria', value: 'ng', dialCode: '234', priority: 0, areaCodes: null },
	{ label: 'Niue', value: 'nu', dialCode: '683', priority: 0, areaCodes: null },
	{ label: 'Norfolk Island', value: 'nf', dialCode: '672', priority: 0, areaCodes: null },
	{ label: "Korea, Democratic People'S Republic Of", value: 'kp', dialCode: '850', priority: 0, areaCodes: null },
	{ label: 'Northern Mariana Islands', value: 'mp', dialCode: '1', priority: 17, areaCodes: ['670'] },
	{ label: 'Norway', value: 'no', dialCode: '47', priority: 0, areaCodes: null },
	{ label: 'Oman', value: 'om', dialCode: '968', priority: 0, areaCodes: null },
	{ label: 'Pakistan', value: 'pk', dialCode: '92', priority: 0, areaCodes: null },
	{ label: 'Palau', value: 'pw', dialCode: '680', priority: 0, areaCodes: null },
	{ label: 'Palestine, State Of', value: 'ps', dialCode: '970', priority: 0, areaCodes: null },
	{ label: 'Panama', value: 'pa', dialCode: '507', priority: 0, areaCodes: null },
	{ label: 'Papua New Guinea', value: 'pg', dialCode: '675', priority: 0, areaCodes: null },
	{ label: 'Paraguay', value: 'py', dialCode: '595', priority: 0, areaCodes: null },
	{ label: 'Peru', value: 'pe', dialCode: '51', priority: 0, areaCodes: null },
	{ label: 'Philippines', value: 'ph', dialCode: '63', priority: 0, areaCodes: null },
	{ label: 'Poland', value: 'pl', dialCode: '48', priority: 0, areaCodes: null },
	{ label: 'Portugal', value: 'pt', dialCode: '351', priority: 0, areaCodes: null },
	{ label: 'Puerto Rico', value: 'pr', dialCode: '1', priority: 3, areaCodes: ['787', '939'] },
	{ label: 'Qatar', value: 'qa', dialCode: '974', priority: 0, areaCodes: null },
	{ label: 'RéUnion', value: 're', dialCode: '262', priority: 0, areaCodes: null },
	{ label: 'Romania', value: 'ro', dialCode: '40', priority: 0, areaCodes: null },
	{ label: 'Russian Federation', value: 'ru', dialCode: '7', priority: 0, areaCodes: null },
	{ label: 'Rwanda', value: 'rw', dialCode: '250', priority: 0, areaCodes: null },
	{ label: 'Saint BarthéLemy', value: 'bl', dialCode: '590', priority: 1, areaCodes: null },
	{ label: 'Saint Helena, Ascension And Tristan Da Cunha', value: 'sh', dialCode: '290', priority: 0, areaCodes: null },
	{ label: 'Saint Kitts And Nevis', value: 'kn', dialCode: '1', priority: 18, areaCodes: ['869'] },
	{ label: 'Saint Lucia', value: 'lc', dialCode: '1', priority: 19, areaCodes: ['758'] },
	{ label: 'Saint Martin (French Part)', value: 'mf', dialCode: '590', priority: 2, areaCodes: null },
	{ label: 'Saint Pierre And Miquelon', value: 'pm', dialCode: '508', priority: 0, areaCodes: null },
	{ label: 'Saint Vincent And The Grenadines', value: 'vc', dialCode: '1', priority: 20, areaCodes: ['784'] },
	{ label: 'Samoa', value: 'ws', dialCode: '685', priority: 0, areaCodes: null },
	{ label: 'San Marino', value: 'sm', dialCode: '378', priority: 0, areaCodes: null },
	{ label: 'Sao Tome And Principe', value: 'st', dialCode: '239', priority: 0, areaCodes: null },
	{ label: 'Saudi Arabia', value: 'sa', dialCode: '966', priority: 0, areaCodes: null },
	{ label: 'Senegal', value: 'sn', dialCode: '221', priority: 0, areaCodes: null },
	{ label: 'Serbia', value: 'rs', dialCode: '381', priority: 0, areaCodes: null },
	{ label: 'Seychelles', value: 'sc', dialCode: '248', priority: 0, areaCodes: null },
	{ label: 'Sierra Leone', value: 'sl', dialCode: '232', priority: 0, areaCodes: null },
	{ label: 'Singapore', value: 'sg', dialCode: '65', priority: 0, areaCodes: null },
	{ label: 'Sint Maarten (Dutch Part)', value: 'sx', dialCode: '1', priority: 21, areaCodes: ['721'] },
	{ label: 'Slovakia', value: 'sk', dialCode: '421', priority: 0, areaCodes: null },
	{ label: 'Slovenia', value: 'si', dialCode: '386', priority: 0, areaCodes: null },
	{ label: 'Solomon Islands', value: 'sb', dialCode: '677', priority: 0, areaCodes: null },
	{ label: 'Somalia', value: 'so', dialCode: '252', priority: 0, areaCodes: null },
	{ label: 'South Africa', value: 'za', dialCode: '27', priority: 0, areaCodes: null },
	{ label: 'Korea, Republic Of', value: 'kr', dialCode: '82', priority: 0, areaCodes: null },
	{ label: 'South Sudan', value: 'ss', dialCode: '211', priority: 0, areaCodes: null },
	{ label: 'Spain', value: 'es', dialCode: '34', priority: 0, areaCodes: null },
	{ label: 'Sri Lanka', value: 'lk', dialCode: '94', priority: 0, areaCodes: null },
	{ label: 'Sudan', value: 'sd', dialCode: '249', priority: 0, areaCodes: null },
	{ label: 'Suriname', value: 'sr', dialCode: '597', priority: 0, areaCodes: null },
	{ label: 'Svalbard And Jan Mayen', value: 'sj', dialCode: '47', priority: 1, areaCodes: ['79'] },
	{ label: 'Sweden', value: 'se', dialCode: '46', priority: 0, areaCodes: null },
	{ label: 'Switzerland', value: 'ch', dialCode: '41', priority: 0, areaCodes: null },
	{ label: 'Syrian Arab Republic', value: 'sy', dialCode: '963', priority: 0, areaCodes: null },
	{ label: 'Taiwan, Province Of China', value: 'tw', dialCode: '886', priority: 0, areaCodes: null },
	{ label: 'Tajikistan', value: 'tj', dialCode: '992', priority: 0, areaCodes: null },
	{ label: 'Tanzania, United Republic Of', value: 'tz', dialCode: '255', priority: 0, areaCodes: null },
	{ label: 'Thailand', value: 'th', dialCode: '66', priority: 0, areaCodes: null },
	{ label: 'Timor-Leste', value: 'tl', dialCode: '670', priority: 0, areaCodes: null },
	{ label: 'Togo', value: 'tg', dialCode: '228', priority: 0, areaCodes: null },
	{ label: 'Tokelau', value: 'tk', dialCode: '690', priority: 0, areaCodes: null },
	{ label: 'Tonga', value: 'to', dialCode: '676', priority: 0, areaCodes: null },
	{ label: 'Trinidad And Tobago', value: 'tt', dialCode: '1', priority: 22, areaCodes: ['868'] },
	{ label: 'Tunisia', value: 'tn', dialCode: '216', priority: 0, areaCodes: null },
	{ label: 'Turkey', value: 'tr', dialCode: '90', priority: 0, areaCodes: null },
	{ label: 'Turkmenistan', value: 'tm', dialCode: '993', priority: 0, areaCodes: null },
	{ label: 'Turks And Caicos Islands', value: 'tc', dialCode: '1', priority: 23, areaCodes: ['649'] },
	{ label: 'Tuvalu', value: 'tv', dialCode: '688', priority: 0, areaCodes: null },
	{ label: 'Virgin Islands, U.S.', value: 'vi', dialCode: '1', priority: 24, areaCodes: ['340'] },
	{ label: 'Uganda', value: 'ug', dialCode: '256', priority: 0, areaCodes: null },
	{ label: 'Ukraine', value: 'ua', dialCode: '380', priority: 0, areaCodes: null },
	{ label: 'United Arab Emirates', value: 'ae', dialCode: '971', priority: 0, areaCodes: null },
	{ label: 'United Kingdom', value: 'gb', dialCode: '44', priority: 0, areaCodes: null },
	{ label: 'United States', value: 'us', dialCode: '1', priority: 0, areaCodes: null },
	{ label: 'Uruguay', value: 'uy', dialCode: '598', priority: 0, areaCodes: null },
	{ label: 'Uzbekistan', value: 'uz', dialCode: '998', priority: 0, areaCodes: null },
	{ label: 'Vanuatu', value: 'vu', dialCode: '678', priority: 0, areaCodes: null },
	{ label: 'Holy See (Vatican City State)', value: 'va', dialCode: '39', priority: 1, areaCodes: ['06698'] },
	{ label: 'Venezuela, Bolivarian Republic Of', value: 've', dialCode: '58', priority: 0, areaCodes: null },
	{ label: 'Viet Nam', value: 'vn', dialCode: '84', priority: 0, areaCodes: null },
	{ label: 'Wallis And Futuna', value: 'wf', dialCode: '681', priority: 0, areaCodes: null },
	{ label: 'Western Sahara', value: 'eh', dialCode: '212', priority: 1, areaCodes: ['5288', '5289'] },
	{ label: 'Yemen', value: 'ye', dialCode: '967', priority: 0, areaCodes: null },
	{ label: 'Zambia', value: 'zm', dialCode: '260', priority: 0, areaCodes: null },
	{ label: 'Zimbabwe', value: 'zw', dialCode: '263', priority: 0, areaCodes: null },
	{ label: 'åLand Islands', value: 'ax', dialCode: '358', priority: 1, areaCodes: ['18'] },
];

export const Phone = {
	/**
	 * Remove all non-digit characters from the phone number and limit length.
	 */
	sanitizedValue({ value, maxLength = 15 }: { value: string; maxLength?: number }): string {
		let sanitizedValue = value.replace(/\D/g, '');

		if (value.length > maxLength) {
			sanitizedValue = sanitizedValue.slice(0, maxLength);
		}

		return sanitizedValue;
	},

	/**
	 * Parse a raw phone number string and return the dial code, country code,
	 * and subscriber number components.
	 */
	format(phoneNumber: string): FormattedPhone {
		const sanitizedValue = this.sanitizedValue({ value: phoneNumber });

		const formatted: FormattedPhone = {
			phoneNumber: sanitizedValue,
			countryCode: 'un',
			dialCode: '',
		};

		let matchedCode: PhoneCountry | undefined;
		let codes: PhoneCountry[] = [];

		for (let i = 0; i < PHONE_CODE.length; i++) {
			const code = PHONE_CODE[i]!;

			if (sanitizedValue.indexOf(code.dialCode) === 0) {
				if (code.areaCodes) {
					const areaCode = sanitizedValue.substring(code.dialCode.length);

					for (let j = 0; j < code.areaCodes.length; j++) {
						if (areaCode.indexOf(code.areaCodes[j]!) === 0) {
							matchedCode = code;
							break;
						}
					}
				}

				codes.push(code);
			}
		}

		codes = codes.sort((a, b) => (a.priority > b.priority ? 1 : -1));

		if (!matchedCode && codes.length) {
			matchedCode = codes[0];
		}

		if (matchedCode) {
			const number = sanitizedValue.substring(matchedCode.dialCode.length);

			formatted.dialCode = matchedCode.dialCode.replace(/[+]/g, '');
			formatted.countryCode = matchedCode.value;
			formatted.phoneNumber = number;
		}

		return formatted;
	},

	/**
	 * Look up a country by its ISO alpha-2 code.
	 * Throws if the country code is not found.
	 */
	getCountryData(countryCode: string): PhoneCountry {
		const countryData = PHONE_CODE.find(
			(item) => item.value.toLowerCase() === countryCode.toLowerCase(),
		);

		if (!countryData) {
			throw new Error(`Country data for "${countryCode}" not found.`);
		}

		return countryData;
	},

	/**
	 * Look up a country by its display name.
	 */
	getCountryCode(countryName: string): PhoneCountry | undefined {
		return PHONE_CODE.find(
			(item) => item.label.toLowerCase() === countryName.toLowerCase(),
		);
	},

	/**
	 * Return the full list of supported countries.
	 */
	getCodeList(): PhoneCountry[] {
		return PHONE_CODE;
	},
};

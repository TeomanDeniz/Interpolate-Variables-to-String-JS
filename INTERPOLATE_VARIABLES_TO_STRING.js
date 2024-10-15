/******************************************************************************\
# JS - INTERPOLATE_VARIABLES_TO_STRING           #       Maximum Tension       #
################################################################################
#                                                #      -__            __-     #
# Teoman Deniz                                   #  :    :!1!-_    _-!1!:    : #
# maximum-tension.com                            #  ::                      :: #
#                                                #  :!:    : :: : :  :  ::::!: #
# +.....................++.....................+ #   :!:: :!:!1:!:!::1:::!!!:  #
# : C - Maximum Tension :: Create - 2024/10/12 : #   ::!::!!1001010!:!11!!::   #
# :---------------------::---------------------: #   :!1!!11000000000011!!:    #
# : License - MIT       :: Update - 2024/10/15 : #    ::::!!!1!!1!!!1!!!::     #
# +.....................++.....................+ #       ::::!::!:::!::::      #
\******************************************************************************/

/*############################################################################*\
|*#                                 CONTENTS                                 #*|
|*############################################################################*|
|*                                                                            *|
|* function INTERPOLATE_VARIABLES_TO_STRING(STRING, {OBJECTS});               *|
|*                                                                            *|
\******************************************************************************/

/*############################################################################*\
|*#                                HOW TO USE                                #*|
|*############################################################################*|
|*                                                                            *|
|* O - EXAMPLES                                                               *|
|* :                                                                          *|
|* ;.., var STRING = "test ${OBJECT} asd";                                    *|
|* :  : var OBJECT = 42;                                                      *|
|* :  :                                                                       *|
|* :  : INTERPOLATE_VARIABLES_TO_STRING(STRING, {OBJECT})                     *|
|* :  :                                                                       *|
|* :  ; RETURNS: "test 42 asd"                                                *|
|* :                                                                          *|
|* ;.., var STRING = "test ${OBJECT.TEST1} asd - ${OBJECT.TEST1}";            *|
|* :  : var OBJECT = {TEST1: 42, TEST2: "a b c"};                             *|
|* :  :                                                                       *|
|* :  : INTERPOLATE_VARIABLES_TO_STRING(STRING, {OBJECT})                     *|
|* :  :                                                                       *|
|* :  ; RETURNS: "test 42 asd - a b c"                                        *|
|* :                                                                          *|
|* ;.., var STRING = "test $[OBJECT]{xxx @.TEST cccc} asd";                   *|
|*    : var OBJECT = [{TEST: 42}, {TEST: "a b c"}, {TEST: "Test"}];           *|
|*    :                                                                       *|
|*    : INTERPOLATE_VARIABLES_TO_STRING(STRING, {OBJECT})                     *|
|*    :                                                                       *|
|*    ; RETURNS: "test xxx 42 ccccxxx a b c ccccxxx Test cccc asd"            *|
|*                                                                            *|
\******************************************************************************/

function /* STRING */
	INTERPOLATE_VARIABLES_TO_STRING(STRING, OBJECT)
{
	function
		PROP(PROP_OBJECT, IS, VALUE)
	{
		if (typeof IS == 'string')
			IS = IS.split('.');

		if (IS.length == 1 && VALUE !== undefined)
			return (PROP_OBJECT[IS[0]] = VALUE);
		else if (IS.length == 0)
			return (PROP_OBJECT);
		else
		{
			var SHIFT = IS.shift();

			if (VALUE !== undefined && PROP_OBJECT[SHIFT] == undefined)
				PROP_OBJECT[SHIFT] = {};

			return (PROP(PROP_OBJECT[SHIFT], IS, VALUE));
		}
	}

	// HANDLE ARRAY-LIKE SYNTAX $[ARRAY]{STRING @.PROPERYU STRING}
	STRING = STRING.replace(
		/\$\[(.+?)\]\{(.+?)\}/g, (MATCH, ARRAY_PROP, TEMPLATE) =>
		{
			const ARRAY = PROP(OBJECT, ARRAY_PROP);

			if (Array.isArray(ARRAY))
			{
				return (
					ARRAY.map(ITEM =>
						{
							return (
								TEMPLATE.replace(
									/@\.(\w+)/g, (SUBMATCH, PROP_NAME) =>
									{
										return (PROP(ITEM, PROP_NAME));
									}
								)
							);
						}
					).join('')
				);
			}

			return (MATCH);
		}
	);
	return (STRING.replace(/\$\{(.+?)\}/g,
		(MATCH, THE_PROP) => PROP(OBJECT, THE_PROP)));
}

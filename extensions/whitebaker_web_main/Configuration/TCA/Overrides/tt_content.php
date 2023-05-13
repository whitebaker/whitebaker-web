<?php

// TCA COLUMNS

$tcaColumns = [
    'whitebaker_text' => [
        'l10n_mode' => 'prefixLangTitle',
        'label' => 'Text',
        'description' => 'field description',
        'config' => [
            'type' => 'input',
            'behaviour' => [
                'allowLanguageSynchronization' => true,
            ],
        ],
    ],
    'whitebaker_checkbox' => [
        'label' => 'Checkbox',
        'config' => [
            'type' => 'check',
            'renderType' => 'checkboxToggle',
            'items' => [
                [
                    'label' => 'Checkbox',
                    'labelChecked' => 'Enabled',
                    'labelUnchecked' => 'Disabled',
                ],
            ],
        ],
    ],
];

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', $tcaColumns);

// NAVIGATION

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_navigation_title',
        'whitebaker_navigation',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_navigation'] = [
    'showitem' => '
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
             --palette--;;general,
             header; Internal title (not displayed),
             pages,
         --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
             space_before_class,
             space_after_class,
             sectionIndex,
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
             --palette--;;hidden,
             --palette--;;access,
       '
];

// PICTURE

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_picture_title',
        'whitebaker_picture',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_picture'] = [
    'showitem' => '
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
             --palette--;;general,
             header; Internal title (not displayed),
             image,
         --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
             space_before_class,
             space_after_class,
             sectionIndex,
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
             --palette--;;hidden,
             --palette--;;access,
       '
];

// CARD

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_card_title',
        'whitebaker_card',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_card'] = [
    'showitem' => '
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
             --palette--;;general,
             header; Internal title (not displayed),
             bodytext;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:bodytext_formlabel,
         --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
             space_before_class,
             space_after_class,
             sectionIndex,
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
             --palette--;;hidden,
             --palette--;;access,
       ',
    'columnsOverrides' => [
       'bodytext' => [
          'config' => [
             'enableRichtext' => true,
             'richtextConfiguration' => 'default',
          ],
       ],
    ],
];

// CAROUSEL

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_carousel_title',
        'whitebaker_carousel',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_carousel'] = [
   'showitem' => '
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            image,
            pi_flexform,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            space_before_class,
            space_after_class,
            sectionIndex,
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access,
            sectionIndex,
      '
];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:whitebaker_web_main/Configuration/Flexforms/Carousel.xml',
    'whitebaker_carousel'
);


// COMPARE

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_compare_title',
        'whitebaker_compare',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_compare'] = [
   'showitem' => '
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            pi_flexform,
            bodytext;Caption,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            space_before_class,
            space_after_class,
            sectionIndex,
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access,
      '
];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:whitebaker_web_main/Configuration/Flexforms/Compare.xml',
    'whitebaker_compare'
);

// THREE

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_three_title',
        'whitebaker_three',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_three'] = [
   'showitem' => '
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            pi_flexform,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            space_before_class,
            space_after_class,
            sectionIndex,
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access,
      '
];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:whitebaker_web_main/Configuration/Flexforms/Three.xml',
    'whitebaker_three'
);

// UNITY

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_unity_title',
        'whitebaker_unity',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_unity'] = [
   'showitem' => '
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
            --palette--;;general,
            pi_flexform,
        --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
            space_before_class,
            space_after_class,
            sectionIndex,
         --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
            --palette--;;hidden,
            --palette--;;access,
      '
];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:whitebaker_web_main/Configuration/Flexforms/Unity.xml',
    'whitebaker_unity'
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', $tcaColumns);

// video

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
   'tt_content',
   'CType',
    [
        'LLL:EXT:whitebaker_web_main/Resources/Private/Language/locallang.xlf:whitebaker_video_title',
        'whitebaker_video',
        'content-text',
    ],
    'textmedia',
    'after'
);
$GLOBALS['TCA']['tt_content']['types']['whitebaker_video'] = [
    'showitem' => '
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
             --palette--;;general,
             image,
             media,
             pi_flexform,
         --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
             space_before_class,
             space_after_class,
             sectionIndex,
          --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
             --palette--;;hidden,
             --palette--;;access,
       '
];
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPiFlexFormValue(
    '*',
    'FILE:EXT:whitebaker_web_main/Configuration/Flexforms/Video.xml',
    'whitebaker_video'
);

// CONTAINERS

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (
        new \B13\Container\Tca\ContainerConfiguration(
            'grid-50-50',
            'Grid 50:50',
            'Grid with 2 colums (50% : 50%)',
            [
                [
                    ['name' => 'col-left', 'colPos' => 200],
                    ['name' => 'col-right', 'colPos' => 201]
                ]
            ]
        )
    )
    ->setIcon('container-2col')
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (
        new \B13\Container\Tca\ContainerConfiguration(
            'grid-67-33',
            'Grid 67:33',
            'Grid with 2 colums (67% : 33%)',
            [
                [
                    ['name' => 'col-left', 'colPos' => 200],
                    ['name' => 'col-right', 'colPos' => 201]
                ]
            ]
        )
    )
    ->setIcon('container-2col-left')
);

\TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\B13\Container\Tca\Registry::class)->configureContainer(
    (
        new \B13\Container\Tca\ContainerConfiguration(
            'grid-33-67',
            'Grid 33:67',
            'Grid with 2 colums (33% : 67%)',
            [
                [
                    ['name' => 'col-left', 'colPos' => 200],
                    ['name' => 'col-right', 'colPos' => 201]
                ]
            ]
        )
    )
    ->setIcon('container-2col-right')
);

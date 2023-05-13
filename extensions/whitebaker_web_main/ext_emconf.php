<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Whitebaker Web Main',
    'description' => 'Whitebaker Website Site Package',
    'category' => 'templates',
    'author' => 'Maximilian Weisbecker',
    'author_email' => 'maximilian.weisbecker@gmail.com',
    'author_company' => 'Whitebaker',
    'version' => '1.0.0',
    'state' => 'stable',
    'constraints' => [
        'depends' => [
            'typo3' => '12.0.0-12.99.99',
            'fluid_styled_content' => '12.0.0-12.99.99'
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Whitebaker\\WhitebakerWebMain\\' => 'Classes',
        ],
    ],
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1
];

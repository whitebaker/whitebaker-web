<?php
defined('TYPO3') || die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    'whitebaker_web_main',
    'Configuration/TypoScript',
    'Whitebaker Web Site Package'
);

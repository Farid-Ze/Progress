import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  Text,
  IconButton,
  Spinner,
  useOutsideClick,
  forwardRef,
} from '@chakra-ui/react';
import { useReducedMotion } from '../../hooks';

// Icons would be imported from your icon library
const SearchIcon = () => <span aria-hidden="true">🔍</span>;
const CloseIcon = () => <span aria-hidden="true">✕</span>;

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: string;
}

export interface SearchProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
  /**
   * If true, the search input will take up the full width of its container
   */
  fullWidth?: boolean;
  /**
   * If true, shows a loading indicator
   */
  isLoading?: boolean;
  /**
   * Search results to display
   */
  results?: SearchResult[];
  /**
   * Callback when search input changes
   */
  onSearch: (query: string) => void;
  /**
   * Callback when a search result is selected
   */
  onResultSelect: (result: SearchResult) => void;
  /**
   * Accessible label for the search input
   */
  ariaLabel?: string;
}

/**
 * Search component with autocomplete functionality.
 * Implements WCAG keyboard navigation and screen reader support.
 */
export const Search = forwardRef<SearchProps, 'div'>((props, ref) => {
  const {
    placeholder = 'Search...',
    fullWidth = false,
    isLoading = false,
    results = [],
    onSearch,
    onResultSelect,
    ariaLabel = 'Search',
  } = props;

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close results when clicking outside
  useOutsideClick({
    ref: resultsRef,
    handler: () => setIsOpen(false),
  });

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
    setIsOpen(value.trim() !== '');
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
    onSearch('');
    inputRef.current?.focus();
  };

  const handleResultClick = (result: SearchResult) => {
    onResultSelect(result);
    setIsOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    
    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
    }
    // Enter
    else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleResultClick(results[activeIndex]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const hasResults = results.length > 0;

  return (
    <Box 
      ref={ref} 
      position="relative" 
      width={fullWidth ? '100%' : 'auto'}
      onKeyDown={handleKeyDown}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon />
        </InputLeftElement>
        
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-controls={hasResults ? "search-results" : undefined}
          aria-activedescendant={activeIndex >= 0 ? `result-${results[activeIndex].id}` : undefined}
          aria-expanded={isOpen && hasResults}
        />
        
        <InputRightElement>
          {isLoading ? (
            <Spinner size="sm" color="brand.blue.500" aria-label="Loading results" />
          ) : query ? (
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              onClick={handleClear}
            />
          ) : null}
        </InputRightElement>
      </InputGroup>

      {isOpen && hasResults && (
        <Box
          ref={resultsRef}
          position="absolute"
          top="100%"
          left="0"
          right="0"
          zIndex="dropdown"
          mt="1"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          borderWidth="1px"
          borderColor="neutral.misty"
          maxH="300px"
          overflowY="auto"
          transition={prefersReducedMotion ? 'none' : 'all 0.2s ease-in-out'}
        >
          <List id="search-results" role="listbox" aria-label="Search results">
            {results.map((result, index) => (
              <ListItem
                key={result.id}
                id={`result-${result.id}`}
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => handleResultClick(result)}
                onMouseEnter={() => setActiveIndex(index)}
                px="3"
                py="2"
                cursor="pointer"
                bg={index === activeIndex ? 'brand.blue.50' : 'transparent'}
                _hover={{ bg: 'brand.blue.50' }}
                transition={prefersReducedMotion ? 'none' : 'background-color 0.2s ease-in-out'}
              >
                <Text fontWeight="medium">{result.title}</Text>
                {result.subtitle && (
                  <Text fontSize="sm" color="neutral.stormCloud">
                    {result.subtitle}
                  </Text>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
});

Search.displayName = 'Search';

export default Search;

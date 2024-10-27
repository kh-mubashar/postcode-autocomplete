import { useState } from 'react';
import styled from 'styled-components';
import { usePostcodeDetails } from '@/hooks/usePostcodeDetails';
import { usePostcodeAutocomplete } from '@/hooks/usePostcodeAutocomplete';
import { PostcodeDetails } from '../PostcodeDetails/PostcodeDetails';

const Container = styled.div`
  position: relative;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SuggestionsBox = styled.ul`
  position: absolute;
  width: 100%;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
`;

interface SuggestionItemProps {
  isFocused: boolean;
}

const SuggestionItem = styled.li<SuggestionItemProps>`
  padding: 8px;
  cursor: pointer;
  background-color: ${({ isFocused }) => (isFocused ? '#f0f0f0' : '#fff')};
`;

export const Autocomplete = () => {
  const [query, setQuery] = useState('');
  const [queryDetails, setQueryDetails] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1); // Track the focused item

  const { data: suggestions } = usePostcodeAutocomplete(query);
  const { data: postcodeDetails } = usePostcodeDetails(queryDetails);

  const onClickHandler = (value: string) => {
    setQueryDetails(value);
    setQuery('');
    setFocusedIndex(-1); 
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions?.length) {
      switch (e.key) {
        case 'ArrowDown':
          setFocusedIndex((prevIndex) =>
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case 'ArrowUp':
          setFocusedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
          );
          break;
        case 'Enter':
          if (focusedIndex >= 0) {
            onClickHandler(suggestions[focusedIndex]);
            e.preventDefault();
          }
          break;
        case 'Tab':
          if (focusedIndex >= 0) {
            onClickHandler(suggestions[focusedIndex]);
            e.preventDefault();
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <Container>
        <Input
          type="text"
          placeholder="Enter postcode"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDownHandler}
        />
        {suggestions && (
          <SuggestionsBox>
            {suggestions.map((suggestion, index) => (
              <SuggestionItem
              data-testid="poscode-list-item"
                key={suggestion}
                isFocused={index === focusedIndex}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => onClickHandler(suggestion)}
              >
                {suggestion}
              </SuggestionItem>
            ))}
          </SuggestionsBox>
        )}
      </Container>
      <PostcodeDetails details={postcodeDetails} />
    </>
  );
};

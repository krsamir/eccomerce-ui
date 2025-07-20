## This is a opinionated guide for how to create a component in thi repo.

Here, we introduce a delightful but scalable component format that you can adopt in your projects. A consistent format will make it easier for you to maintain components in the long run.

    Imports and constants
    Component State
    Other hooks
    Helper functions (scoped)
    Effects
    JSX (return statement)
    Abstracted JSX only used in this file
    Prop type definition

## Component Format
```js

/**
 * 1. Imports and constants
 * You can configure an alias in your build tool that allow you to reference a root or specific folder
 * leads to cleaner imports and not nested spaghetti code like ../../../../some/random/folder/far/away
 */
import { blahblahblah } from '@/features/blah'
import { UserContext } from '@/contexts/user'

// for additional organization in the imports section ^^, you can
// alphebetize them with a package like @trivago/prettier-plugin-sort-imports

const operations = {
  '+': (left: number, right: number): number => left + right,
  '-': (left: number, right: number): number => left - right,
  '*': (left: number, right: number): number => left * right,
  '/': (left: number, right: number): number => left / right,
}

/**
 * 2. Prefer simple function definition over const definition
 *    e.g. const Calculator: React.FC<Props> = () => {}
 */
export function Calculator({left, operator, right}) {
  /**
   * 3. Component State
   */
  const { user } = useContext(UserContext);
  const [someState, setSomeState] = useState();
  const [someOtherState, setSomeOtherState] = useState();
  const result = operations[operator](left, right)
  const someCondition = true;

  /**
   * 4. Other hooks
   */
  const cachedValue = useMemo(calculateValue, dependencies)
  const cachedFn = useCallback(fn, dependencies)

  /**
   * 5. Helper functions
   */
  function helperFunctionThatReliesOnComponentState() {
    cachedFn(cachedValue);
  }

  /**
   * 6. Effects
   */
  useEffect(() => {
    // your effect code

    return () => {
      // your effect cleanup code
    }
  }, dependencies);


  /**
   * 7. JSX / Return statement
   * Advice: you can keep your return statements clean by moving static JSX to their own micro-components at the bottom of this file in step 8.
   */
  return (
    {someCondition ? <ShortenedMarkup /> : (
      <div>
        <code>
          {left} {operator} {right} = <output>{result}</output>
        </code>
      </div>
    )}
  );
}

/**
 * 8. Abstracted JSX used only in this file
 */
function ShortenedMarkup() {
  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              Some UI content that doesn't rely on the props/state of the component above
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Prop type definition if any
*/

```